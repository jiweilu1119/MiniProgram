# JASON数据格式

### 用法

JSON 是 JavaScript Object Notation 的简称，是一种轻量的数据表示方法。json格式采用**key:value**的方式记录数据，非常直观。

```
{ "firstName": "Brett" }
```

还可以创建包含**多个名称/值对的*记录***，比如：

```
{ "firstName": "Brett", "lastName":"McLaughlin", "email": "brett@newInstance.com" }
```

从语法方面来看，这与名称/值对相比并没有很大的优势，但是在这种情况下 **JSON 更容易使用，而且可读性更好。**例如，它明确地表示以上三个值都是同一记录的一部分；花括号使这些值有了某种联系。

**数组**

**当需要表示一组值时，JSON 不但能够提高可读性，而且可以减少复杂性。**例如，假设您希望表示一个人名列表。在 XML 中，需要许多开始标记和结束标记；如果使用典型的名称/值对（就像在本系列前面文章中看到的那种名称/值对），那么必须建立一种专有的数据格式，或者将键名称修改为 person1-firstName 这样的形式。如果使用 JSON，就只需将多个带花括号的记录分组在一起：

```
{ "programmers": [
{ "firstName": "Brett", "lastName":"McLaughlin", "email": "brett@newInstance.com" },
{ "firstName": "Jason", "lastName":"Hunter", "email": "jason@servlets.com" },
{ "firstName": "Elliotte", "lastName":"Harold", "email": "elharo@macfaq.com" }
],
"authors": [
{ "firstName": "Isaac", "lastName": "Asimov", "genre": "science fiction" },
{ "firstName": "Tad", "lastName": "Williams", "genre": "fantasy" },
{ "firstName": "Frank", "lastName": "Peretti", "genre": "christian fiction" }
],
"musicians": [
{ "firstName": "Eric", "lastName": "Clapton", "instrument": "guitar" },
{ "firstName": "Sergei", "lastName": "Rachmaninoff", "instrument": "piano" }
]
}
```



### 优点

具有良好的可读和便于快速编写的特性。可在不同平台之间进行数据交换。JSON采用兼容性很高的、完全独立于语言文本格式，同时也具备类似于C语言的习惯(包括C, C++, C#, Java, JavaScript, Perl, Python等)体系的行为。这些特性使JSON成为理想的数据交换语言。JSON基于JavaScript Programming Language , Standard ECMA-262 3rd Edition - December 1999 的一个子集：

**1.数据格式比较简单，易于读写，格式都是压缩的，占用带宽小；**



**2. JSON 是完全动态的**，允许在 JSON 结构的中间改变表示数据的方式。

在处理 JSON 格式的数据时，没有需要遵守的预定义的约束。所以，在同样的数据结构中，可以改变表示数据的方式，甚至可以以不同方式表示同一事物。



**3. JSON 是 JavaScript 原生格式**，这意味着在JavaScript 中处理 JSON 数据不需要任何特殊的 API 或工具包。在 JavaScript 中使用 JSON：可以创建一个新的 JavaScript 变量，然后**将 JSON 格式的数据字符串直接赋值**给它：

```
`var people =
{ "programmers": [
{ "firstName": "Brett", "lastName":"McLaughlin", "email": "brett@newInstance.com" },
{ "firstName": "Jason", "lastName":"Hunter", "email": "jason@servlets.com" }

{ "firstName": "Elliotte", "lastName":"Harold", "email": "elharo@macfaq.com" }
]}`
```



**4. 访问数据方便**，把JSON 格式的数组放进 JavaScript 变量之后，就可以很轻松地访问它。实际上，**只需用点号表示法来表示数组元素**。所以，要想访问 programmers 列表的第一个条目的姓氏，只需在 JavaScript 中使用下面这样的代码：

```
people.programmers[0].lastName;
```

注意，数组索引是从零开始的。



**5. 修改数据方便**，正如可以用点号和括号访问数据，也可以按照同样的方式轻松地修改数据：

```
people.musicians[1].lastName = "Rachmaninov";
```

在将字符串转换为 JavaScript 对象之后，就可以像这样修改变量中的数据。



**6. 在字符串和JavaScript 对象之间转换轻松**

当然，如果不能轻松地将对象转换回文本格式，那么所有数据修改都没有太大的价值。在 JavaScript中这种转换也很简单：

```
String newJSONtext = people.toJSONString();
```

现在就获得了一个可以在任何地方使用的文本字符串，例如，可以将它用作 Ajax 应用程序中的请求字符串。

更重要的是，可以将***任何* JavaScript 对象转换为 JSON 文本**。并非只能处理**原来用 JSON 字符串赋值的变量**。为了对名为 myObject 的对象进行转换，只需执行相同形式的命令：

```
String myObjectInJSON = myObject.toJSONString();
```

这就是 JSON 与其他数据格式之间最大的差异。如果使用 JSON，**只需调用一个简单的函数，就可以获得经过格式化的数据，并直接使用**。而其他数据格式则需要在原始数据和格式化数据之间进行转换。
