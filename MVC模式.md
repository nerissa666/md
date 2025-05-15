## **MVC 模式**

M --model 数据 data
V --view 视图 html
C --controller 控制逻辑 js+html 通过 js 给 html 添加事件的过程
将 DOM 操作 和 data 操作分离 并将用户触发 dom 引起的数据更变 交由 controller 来控制 data 修改时机
data 引发的变化 例如（init, setTimeout）引起的视图更新 由 data 之间调用 view 更新

![MVC 模式](https://124.71.203.87/md/MVC.png)

```
    const View = (function () {
        const friuts = document.querySelectorAll("span");
        const btns = document.querySelectorAll("button");
        return {
          init(data) {
            friuts[0].innerText = data[0];
            friuts[1].innerText = data[1];
            friuts[2].innerText = Model.total();
            this.addControl();
          },
          update(data) {
            friuts.forEach((span, index) => {
              index === 2
                ? (span.innerText = Model.total())
                : (span.innerText = data[index]);
            });
          },
          addControl() {
            btns.forEach((btn, index) => {
              btn.addEventListener("click", () => {
                if (index < 2) {
                  Controller.buyEvent(index);
                } else {
                  Controller.eatEvent(index);
                }
              });
            });
          },
        };
      })();

      const Controller = {
        buyEvent(index) {
          Model.update(index, 1, true);
        },
        eatEvent(index) {
          Model.update(index - 2, 1);
        },
      };

      const Model = (function () {
        let data = [88, 0];
        return {
          total() {
            return data.reduce((total, cur) => total + cur);
          },
          update(index, num, bool = false) {
            data[index] = bool ? data[index] + num : data[index] - num;
            this.validator();
            View.update(data);
          },
          validator() {
            data = data.map((item) => {
              console.log(item);
              if (item < 0) {
                alert("水果不够了");
                return 0;
              }
              if (item > 99) {
                alert("水果太多了");
                return 99;
              }
              return item;
            });
            console.log(data);
          },
          getData() {
            return [...data];
          },
        };
      })();

      View.init(Model.getData());
```
