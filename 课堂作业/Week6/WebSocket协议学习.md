# WebSocket协议

### WebSocket协议出现的背景

我们在上网过程中经常用到的是HTTP和HTTPS协议，HTTP协议和HTTPS协议通信过程通常是客户端通过浏览器发出一个请求，服务器接受请求后进行处理并返回结果给客户端，客户端处理结果。
这种机制对于信息变化不是特别频繁的应用可以良好支撑，但对于实时要求高、海量并发的应用来说显得捉襟见肘，尤其在移动互联网蓬勃发展的趋势下，高并发与用户实时响应是Web应用经常面临的问题，比如金融证券的实时信息、社交网络的实时消息推送等。
WebSocket出现前我们实现推送技术，用的都是轮询，在特定的时间间隔，浏览器自动发出请求，将服务器的消息主动的拉回来，这种情况下，我们需要不断的向服务器发送请求，并且HTTP 请求 的header非常长，里面包含的数据可能只是一个很小的值，这样会占用很多的带宽和服务器资源，并且服务器不能主动向客户端推送数据。在这种情况下需要一种高效节能的双向通信机制来保证数据的实时传输，于是基于HTML5规范的WebSocket应运而生。



### WebSocket与HTTP

了解WebSocket的出现背景后，应该对WebSocket有了一些认知。一句话概括：
WebSocket是HTML5下一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的。

#### WebSocket与TCP，HTTP的关系

**WebSocket与http协议一样都是基于TCP**的，所以他们都是可靠的协议，调用的WebSocket的send函数在实现中最终都是通过TCP的系统接口进行传输的。**WebSocket和Http协议一样都属于应用层**的协议，WebSocket在建立握手连接时，数据是通过http协议传输的，但是在建立连接之后，真正的数据传输阶段是不需要http协议参与的。具体关系如下：

![5088376-b34bed6403477d44](/Users/jiweilu/Desktop/5088376-b34bed6403477d44.jpeg)



#### WebSocket与HTTP轮询

HTTP实现实时推送用到的轮询，轮询分两种：长轮询和短轮询（传统轮询）

短轮询：浏览器定时向服务器发送请求，服务器收到请求不管是否有数据到达都直接响应 请求，隔特定时间，浏览器又会发送相同的请求到服务器， 获取数据响应，如图：

![5088376-3e4d5460dbefb9df.png](/Users/jiweilu/Desktop/5088376-3e4d5460dbefb9df.png.jpeg)

长轮询：浏览器发起请求到服务器，服务器一直保持连接打开，直到有数据可发送。发送完数据之后，浏览器关闭连接，随即又发起一个到服务器的新请求。这一过程在页面打开期间一直持续不断。如图：

![5088376-30c99379c6260b2a.png](/Users/jiweilu/Desktop/5088376-30c99379c6260b2a.png.jpeg)



缺点：服务器没有数据到达时，http连接会停留一段时间，造成服务器资源浪费，数据交互的实时性较低，服务端到浏览器端的数据反馈效率低



**无论是长轮询还是短轮询，浏览器都要先发起对服务器的连接，才能接收数据，并且实时交互性很低。**

然而，**WebSocket的出现解决了轮询实时交互性和全双工的问题。**
在JavaScript中创建了WebSocket后，会有一个HTTP请求发送到服务器以发起连接。**取得服务器响应后，建立的连接使用HTTP升级，从HTTP协议交换为WebSocket协议。**即，使用标准的HTTP服务器无法实现WebSocket，只有支持这种协议的专门服务器才能正常工作。
WebSocket使用了自定义的协议，未加密的连接不再是http://，而是ws://，默认端口为80，加密的连接也不是https://，而是wss://，默认端口为443。

![5088376-ebc5399ed29120a8.png](/Users/jiweilu/Desktop/5088376-ebc5399ed29120a8.png.jpeg)



WebSocket是类似Socket的TCP长连接通讯模式。一旦WebSocket连接建立后，**后续数据都以帧序列的形式**传输。在客户端断开WebSocket连接或Server端中断连接前，不需要客户端和服务端重新发起连接请求。在海量并发及客户端与服务器交互负载流量大的情况下，极大的节省了网络带宽资源的消耗，有明显的性能优势，且客户端发送和接受消息是在同一个持久连接上发起，实时性优势明显。

**WebSocket与HTTP轮询对比得出的结论：**
WebSocket是真正的全双工方式，建立连接后客户端与服务器端是完全平等的，可以互相主动请求。而HTTP长连接基于HTTP，是传统的客户端对服务器发起请求的模式。



## 创建WebSocket实例

要创建WebSocket，先实例一个WebSocket对象并传入要连接的URL：

```csharp
var socket = new WebSocket('http://localhost:8000');
```

执行上面语句后，浏览器会马上尝试创建连接，与XHR类似，WebSocket也有一个表示当前状态的readyState属性。不过，这个属性的值与XHR不相同， socket.readyState值如下：

- 0：正在建立连接， WebSocket.OPENING
- 1：已经建立连接， WebSocket.OPEN
- 2：正在关闭连接， WebSocket.CLOSING
- 3：已经关闭连接， WebSocket.CLOSE
  WebSocket没有readystatechange事件，不过，有其他事件对应着不同的状态，readyState的值永远从0开始。
  示例如下：

```jsx
var socket = new WebSocket('ws://localhost:8000');

  //正在建立连接
  console.log("[readyState]-" + socket.readyState); //0

  //连接建立成功回调
  socket.onopen = function() {
    console.log('Connection established.')
    console.log("[readyState]-" + socket.readyState); //1
    //发送消息
    // socket.send('hello world');
  };

  //连接失败回调
  socket.onerror = function() {
    console.log("[readyState]-" + socket.readyState);//3
    console.log('Connection error.')
  };

  //连接关闭回调
  socket.onclose = function(event) {
    var code = event.code;
    var reason = event.reason;
    var wasClean = event.wasClean;
    console.log("[readyState]-" + socket.readyState);//3
    console.log('Connection closed.')
    console.log(code, reason, wasClean)
  };
```



要关闭WebSocket连接，可以在任何时候调用close方法。

```css
socket.close();
```

调用了close()之后，readyState的值立即变为2（正在关闭），关闭连接后就会变成3。

#### 发送和接收数据

WebSocket连接建立之后，可以通过连接发送和接收数据。
使用send()方法向服务器发送数据，如下：

```csharp
var socket = new WebSocket('ws://localhost:8000');
socket.send('hello world');
```

当服务器向客户端发来消息时，WebSocket对象会触发message事件。这个message事件与其他传递消息的协议类似，也是把返回的数据保存在event.data属性中。

```jsx
 socket.onmessage = function(event) {
  var data = event.data;
  //处理数据
};
```

















































资料来源链接：https://www.jianshu.com/p/1b2019b02126

来源：简书

