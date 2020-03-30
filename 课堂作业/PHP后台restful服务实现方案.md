# PHP后台restful服务实现方案 PHP开发框架

RESTFUL是一种网络应用程序的设计风格和开发方式，基于HTTP，可以使用XML格式定义或JSON格式定义。RESTFUL适用于移动互联网厂商作为业务使能接口的场景，实现第三方OTT调用移动网络资源的功能，动作类型为新增、变更、删除所调用资源。

1.Restful的实现案例（PHP）

```
restful/目录
    Request.php 数据操作类
    Response.php 输出类
    index.php 入口文件
    .htaccess 重写url
```

Request.php ：包含一个Request类，即数据操作类。接收到URL的数据后，根据请求URL的方式（GET|POST|PUT|PATCH|DELETE）对数据进行相应的增删改查操作，并返回操作后的结果：

 * ```
 <?php`

`/**`
    
    - `数据操作类`
      `*/`
      `class Request`
  `{`
  `//允许的请求方式`
      `private static $method_type = array('get', 'post', 'put', 'patch', 'delete');
  //测试数据
      private static $test_class = array(`
      `=> array('name' => '托福班', 'count' => 18),`
      `=> array('name' => '雅思班', 'count' => 20),`
      `);`
    
      `public static function getRequest()`
      `{`
          `//请求方式`
          `$method = strtolower($_SERVER['REQUEST_METHOD']);
          if (in_array($method, self::$method_type)) {
              //调用请求方式对应的方法
          $data_name = $method . 'Data';
              return self::$data_name($_REQUEST);`
          `}`
          `return false;`
      `}`
    
      `//GET 获取信息`
      `private static function getData($request_data)
      {
          $class_id = (int)$request_data['class'];
          //GET /class/ID：获取某个指定班的信息
          if ($class_id > 0) {
          return self::$test_class[$class_id];
          } else {//GET /class：列出所有班级
              return self::$test_class;`
          `}`
      `}`
    
      `//POST /class：新建一个班`
      `private static function postData($request_data)
      {
          if (!empty($request_data['name'])) {
              $data['name'] = $request_data['name'];
              $data['count'] = (int)$request_data['count'];
              self::$test_class[] = $data;
          return self::$test_class;//返回新生成的资源对象`
          `} else {`
              `return false;`
          `}`
      `}`
    
      `//PUT /class/ID：更新某个指定班的信息（全部信息）`
      `private static function putData($request_data)
      {
          $class_id = (int)$request_data['class'];
          if ($class_id == 0) {
              return false;
          }
          $data = array();
          if (!empty($request_data['name']) && isset($request_data['count'])) {
              $data['name'] = $request_data['name'];
              $data['count'] = (int)$request_data['count'];
              self::$test_class[$class_id] = $data;
          return self::$test_class;`
          `} else {`
              `return false;`
          `}`
      `}`
    
      `//PATCH /class/ID：更新某个指定班的信息（部分信息）`
      `private static function patchData($request_data)
      {
          $class_id = (int)$request_data['class'];
          if ($class_id == 0) {
              return false;
          }
          if (!empty($request_data['name'])) {
              self::$test_class[$class_id]['name'] = $request_data['name'];
          }
      if (isset($request_data['count'])) {
              self::$test_class[$class_id]['count'] = (int)$request_data['count'];
          }
          return self::$test_class;`
      `}`
    
      `//DELETE /class/ID：删除某个班`
      `private static function deleteData($request_data)
      {
          $class_id = (int)$request_data['class'];
          if ($class_id == 0) {
          return false;
       }
       unset(self::$test_class[$class_id]);
       return self::$test_class;`
   `}`
   `}
 ```
 
 

