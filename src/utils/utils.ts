/**
 * 通过文件地址获取文件名
 * @param {string} filePath 文件地址
 * @returns 文件名
 */
export const getFilenameFromPath = function (filePath: string) {
  // 使用路径分隔符（/）来分割路径，并获取最后一个元素（文件名）
  const parts = filePath.split("/");
  const filenameWithParams = parts[parts.length - 1];

  // 查找文件名中的最后一个点
  const lastDotIndex = filenameWithParams.lastIndexOf(".");

  // 如果没有点或点在文件名的第一个字符位置，则返回原文件名
  if (lastDotIndex <= 0) {
    return filenameWithParams;
  }

  // 返回点之前的部分作为文件名
  const filename = filenameWithParams.substring(0, lastDotIndex);

  // 返回文件名加上后缀部分
  const extension = filenameWithParams.substring(lastDotIndex);
  return filename + extension;
};

// ================================ 分割线 ================================

/**
 * 数据深拷贝
 * @param {any} obj - 需要深拷贝的对象或数组
 * @returns {any} - 深拷贝后的新对象或数组
 */
export const deepCopy = function <T extends any>(obj: T): T {
  // 如果是基本数据类型或 null，则直接返回
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 创建一个新对象或数组，根据原始对象的类型来判断
  const newObj = (Array.isArray(obj) ? [] : {}) as T;

  // 遍历原始对象的属性或数组元素
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归调用深拷贝函数，复制属性值
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
};

// ================================ 分割线 ================================

type Obj = { [key: string]: any };

// 用来阻断类型推断
type NoInfer<T> = [T][T extends any ? 0 : never];

type TreeNode<A extends Obj, T extends string = "children"> = A & {
  // eslint-disable-next-line no-unused-vars
  [key in T]?: TreeNode<A, T>[];
};

/**
 * 根据提供的函数 `predicate` 过滤树形结构。
 * 保留 `predicate` 返回 true 的节点，并保留那些有通过过滤的节点及其父节点。
 *
 * @param treeData - 需要过滤的树形结构数据。
 * @param predicate - 用于判断节点是否保留的函数。
 * @param children - 子节点属性的名称，默认为 'children'。
 * @returns 过滤后的新树形结构。
 */
export const treeFilter = function <
  A extends Obj,
  T extends string = "children"
>(
  /** 要过滤的树结构 */
  treeData: TreeNode<A, NoInfer<T>>[] = [],
  /** 该函数用于确定是否应保留节点 */
  predicate: (node: TreeNode<A, NoInfer<T>>) => boolean,
  /** 子节点属性的名称 */
  children?: T
): TreeNode<A, NoInfer<T>>[] {
  // 深拷贝树形数据
  const treeDataCopy = deepCopy(treeData);

  // 递归过滤函数
  const filterTree = (
    nodes: TreeNode<A, NoInfer<T>>[]
  ): TreeNode<A, NoInfer<T>>[] => {
    const _childrenKey = children || "children";

    return nodes
      .map((node) => {
        // 递归过滤子节点
        const children = filterTree(node[_childrenKey] || []);

        // 检查当前节点是否通过过滤函数
        if (predicate(node)) {
          // 如果节点通过过滤，保留其过滤后的子节点（如果有的话）并返回节点
          if (children && children.length > 0) {
            (node[_childrenKey] as TreeNode<A, NoInfer<T>>[]) = children;
          }
          return node;
        } else {
          // 如果节点没有通过过滤，检查其子节点是否有通过过滤的
          if (children && children.length > 0) {
            (node[_childrenKey] as TreeNode<A, NoInfer<T>>[]) = children;
            return node;
          }
          // 如果节点和其子节点都没有通过过滤，返回 null
          return null;
        }
      })
      .filter((node) => node !== null) as TreeNode<A, NoInfer<T>>[]; // 过滤掉返回 null 的节点
  };

  return filterTree(treeDataCopy);
};

// ================================ 分割线 ================================

/**
 * 对树形结构的每个节点应用回调函数，并返回一个新的树形结构。
 *
 * 类似于数组的 `map` 方法。
 *
 * 为了严谨，不需要在callback中返回children属性，但是你可以通过children指定当前数据的子节点键名，或者newChildren指定新数据的子节点键名。
 *
 * @param treeData - 要遍历和转换的树形结构数据。
 * @param callback - 应用于每个节点的回调函数。
 * @param children - 子节点属性的名称，默认为 'children'。
 * @param newChildren - map过后子节点的属性名称，默认为 'children'。
 * @returns 新的树形结构，节点经过回调函数的转换。
 */
export const treeMap = function <
  A extends Obj,
  B extends Obj,
  T extends string = "children",
  N extends string = "children"
>(
  treeData: TreeNode<A, NoInfer<T>>[] = [],
  callback: (node: TreeNode<A, NoInfer<T>>) => TreeNode<B, NoInfer<N>>,
  children?: T,
  newChildren?: N
): TreeNode<B, NoInfer<N>>[] {
  const _childrenKey = children || "children";
  const _newChildrenKey = newChildren || "children";

  // 递归遍历和转换树的函数
  const mapTree = (nodes: TreeNode<A, T>[]): TreeNode<B, NoInfer<N>>[] => {
    return nodes.map((node) => {
      // 对当前节点应用回调函数
      const newNode = callback({ ...node });

      const children = node[_childrenKey] as TreeNode<A, T>[];

      // 如果有子节点，递归应用回调函数
      if (children && children.length > 0) {
        (newNode[_newChildrenKey] as TreeNode<B, NoInfer<N>>[]) =
          mapTree(children);
      }

      return newNode;
    });
  };

  return mapTree(treeData);
};

/**
 * 将tree扁平化
 * @param treeData - 要扁平化的树形结构数据。
 * @param children - 子节点属性的名称，默认为 'children'。
 */
export const flattenTree = function <
  A extends Obj,
  T extends string = "children"
>(treeData: TreeNode<A, NoInfer<T>>[] = [], children?: T) {
  const childrenKey = children || "children";

  const list: TreeNode<A, NoInfer<T>>[] = [];

  const deep = function (obj: TreeNode<A, NoInfer<T>>) {
    list.push(obj);
    (obj[childrenKey] as TreeNode<A, NoInfer<T>>[])?.forEach((item) =>
      deep(item)
    );
  };

  treeData.forEach((item) => deep(item));

  return list;
};
