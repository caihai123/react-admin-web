/**
 * 代码来源：https://github.com/wooorm/starry-night?tab=readme-ov-file#example-integrate-with-unified-remark-and-rehype
 * 改动：因为此代码不支持react-markdown组件，https://github.com/remarkjs/react-markdown/issues/680
 * 所以我做了一点简单的改动，以至于丢失了该插件的grammars配置功能，且必须设置webpack的 experiments: {topLevelAwait: true},
 */

/**
 * @typedef {import('@wooorm/starry-night').Grammar} Grammar
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef Options
 *   Configuration (optional)
 * @property {Array<Grammar> | null | undefined} [grammars]
 *   Grammars to support (default: `common`).
 */

import { common, createStarryNight } from "@wooorm/starry-night";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

const grammars = common;
const starryNightPromise = createStarryNight(grammars);
const starryNight = await starryNightPromise;

/**
 * Highlight code with `starry-night`.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeStarryNight() {
  const prefix = "language-";

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {Promise<undefined>}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, "element", function (node, index, parent) {
      if (!parent || index === undefined || node.tagName !== "pre") {
        return;
      }

      const head = node.children[0];

      if (!head || head.type !== "element" || head.tagName !== "code") {
        return;
      }

      const classes = head.properties.className;

      if (!Array.isArray(classes)) return;

      const language = classes.find(function (d) {
        return typeof d === "string" && d.startsWith(prefix);
      });

      if (typeof language !== "string") return;

      const scope = starryNight.flagToScope(language.slice(prefix.length));

      // Maybe warn?
      if (!scope) return;

      const fragment = starryNight.highlight(toString(head), scope);
      // eslint-disable-next-line prefer-destructuring
      const children = /** @type {Array<ElementContent>} */ (fragment.children);

      parent.children.splice(index, 1, {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            `highlight-${scope.replace(/^source\./, "").replace(/\./g, "-")}`,
          ],
        },
        children: [
          { type: "element", tagName: "pre", properties: {}, children },
        ],
      });
    });
  };
}
