import { useState, createRef, type CSSProperties } from "react";
import { Button, Card, Space } from "antd";
import { Flipper, Flipped } from "react-flip-toolkit";

import styled from "styled-components";

const Item = styled.span`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaa;
  margin-right: -1px;
  margin-bottom: -1px;
`;

const shuffleArray = function (array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  // 当还有剩余元素要打乱时
  while (currentIndex !== 0) {
    // 选择一个剩余元素
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // 交换它与当前元素
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default function ListTranstion(props: { style?: CSSProperties }) {
  const [items, setItems] = useState([
    {
      id: 1,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 2,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 3,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 4,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 5,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 6,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 7,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 8,
      nodeRef: createRef<HTMLSpanElement>(),
    },
    {
      id: 9,
      nodeRef: createRef<HTMLSpanElement>(),
    },
  ]);
  const [nextNum, setNextNum] = useState(10);

  const randomIndex = function () {
    return Math.floor(Math.random() * items.length);
  };

  const add = function () {
    const _items = [...items];
    _items.splice(randomIndex(), 0, {
      id: nextNum,
      nodeRef: createRef<HTMLSpanElement>(),
    });

    setItems(_items);
    setNextNum(nextNum + 1);
  };

  const remove = function () {
    const _items = [...items];
    _items.splice(randomIndex(), 1);
    setItems(_items);
  };

  const [lists, setLists] = useState(
    Array.from({ length: 100 }, (_, i) => `${i}`)
  );

  return (
    <div style={props.style}>
      <h2>列表过渡</h2>
      <Card>
        <div>
          <p>
            <a
              href="https://reactcommunity.org/react-transition-group/"
              target="_blank"
              rel="noreferrer"
            >
              react-transition-group
            </a>
            组件只能进入和离开动画，要想实现
            <a
              href="https://aerotwist.com/blog/flip-your-animations/"
              target="_blank"
              rel="noreferrer"
            >
              FLIP
            </a>
            动画可能也可以，不过我是不行了，所以这里我使用了
            <a
              href="https://www.npmjs.com/package/react-flip-toolkit"
              target="_blank"
              rel="noreferrer"
            >
              react-flip-toolkit
            </a>
            ，这是一个非常棒的插件。
          </p>
          <Space>
            <Button onClick={() => add()}>Add</Button>
            <Button onClick={() => remove()}>Remove</Button>
            <Button onClick={() => setItems(shuffleArray([...items]))}>
              Shuffle
            </Button>
          </Space>

          <div style={{ display: "flex", marginTop: 20 }}>
            <Flipper flipKey={items.map((item) => item.id).join(",")}>
              {items.map((item) => (
                <Flipped key={`${item.id}`} flipId={`${item.id}`}>
                  <Item>{`${item.id}`}</Item>
                </Flipped>
              ))}
            </Flipper>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <p>多维网格也同样可以过渡</p>
          <Space>
            <Button onClick={() => setLists(shuffleArray([...lists]))}>
              Shuffle
            </Button>
          </Space>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 240,
              marginTop: 20,
            }}
          >
            <Flipper flipKey={lists.join(",")}>
              {lists.map((i) => (
                <Flipped key={i} flipId={i}>
                  <Item>{i}</Item>
                </Flipped>
              ))}
            </Flipper>
          </div>
        </div>
      </Card>
    </div>
  );
}
