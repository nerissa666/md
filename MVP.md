## **MVP 模式**

M -- 数据
V -- html
P -- presenter (管理者)
将 M 与 V 之间关系的耦合部分交给第三方 presenter 进行管理 而不是相互引用

![MVC 模式](https://124.71.203.87/md/MVP.png)

```
    const MVP = (function () {
        const Model = (function () {
          let data = [
            {
              name: "小明",
              like: 998,
              unlike: 1,
            },
            {
              name: "小红",
              like: 9997,
              unlike: 3,
            },
            {
              name: "小蓝",
              like: 4,
              unlike: 5,
            },
          ];
          return {
            update(index, type) {
              data[index][type]++;
            },
            get(index, type) {
              return index || type
                ? data[index][type]
                : JSON.parse(JSON.stringify(data));
            },
          };
        })();
        const View = (function () {
          const ul = document.querySelector("ul");
          let likeSpan = [];
          return {
            init(data) {
              let html = "";
              data.forEach((item) => {
                html += `
                  <li>
                    <p>${item.name}</p>
                    <p>点赞 <span>${this.format(item.like)}</span></p>
                    <p>不推荐 <span>${this.format(item.unlike)}</span></p>
                  </li>
                `;
              });
              ul.innerHTML = html;
              this.getDOM();
            },
            update(index, num) {
              likeSpan[index].innerText = this.format(num);
            },
            format(num) {
              if (num >= 1000) {
                return (num / 1000).toFixed(1) + "k+";
              } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "w+";
              } else {
                return num;
              }
            },
            getDOM() {
              likeSpan = document.querySelectorAll("span");
            },
          };
        })();
        const Presenter = (function () {
          let btns = [];
          return {
            init() {
              View.init(Model.get());
              this.getDOM();
            },
            getDOM() {
              btns = document.querySelectorAll("li p:not(:first-child)");
              this.addEventListener();
            },
            addEventListener() {
              btns.forEach((dom, index) => {
                dom.onclick = () => {
                  if (index % 2 === 0) {
                    Model.update(Math.floor(index / 2), "like");
                    View.update(
                      index,
                      Model.get(Math.floor(index / 2), "like")
                    );
                  } else {
                    Model.update(Math.ceil(index / 2) - 1, "unlike");
                    View.update(
                      index,
                      Model.get(Math.ceil(index / 2) - 1, "unlike")
                    );
                  }
                };
              });
            },
          };
        })();
        return {
          exe() {
            Presenter.init();
          },
        };
      })();
      MVP.exe();
```
