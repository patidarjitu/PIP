var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'home'
      }).
      when('/post', {
        templateUrl: 'partials/addpost.html',
        controller: 'addpost'
      }).
      when('/post/:id', {
        templateUrl: 'partials/post.html',
        controller: 'getpost'
      }).
      when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'users'
      }).

      when('/login', {
        templateUrl: 'partials/login.html',     
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  
//   app.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (AuthService.isLoggedIn() === false) {
//       $location.path('/login');
//     }
//   });
// });
// app.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (next.access.restricted && !AuthService.getUserStatus()) {
//       $location.path('/');
//     }
//   });
// });
app.controller('root',['$scope','$http','AuthService',function($scope, $http,AuthService) {

}]);
app.controller('login',['$scope','$location','AuthService','$window',function($scope, $location,AuthService,$window) {
    
        
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function (response) {
            console.log(response);  
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
          
          
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
app.controller('logout',['$scope','$location','AuthService',function($scope, $location,AuthService) {
    console.log(AuthService.getUserStatus());
    

    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };
}]);

app.controller('register',['$scope','$location','AuthService',function($scope, $location,AuthService) {
    console.log(AuthService.getUserStatus());
    navigator.geolocation.getCurrentPosition(pos1);
            $scope.ucoords=[];
                function pos1(po){
                $scope.ucoords[0]=po.coords.longitude;
                $scope.ucoords[1]=po.coords.latitude;
                return $scope.ucoords;
                }
    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      // call register from service
      console.log($scope.ucoords);
      AuthService.register($scope.registerForm.username, $scope.registerForm.password,$scope.ucoords)
        // handle success
        .then(function (data) {
          console.log(data);
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);


    
app.controller('home',['$scope','$http','AuthService','$rootScope','$location',function($scope, $http,AuthService,$rootScope,$location) {
    $scope.progressbar=true;
    
     console.log(AuthService.getUserStatus());
        console.log(AuthService.getUserDetails());
    $scope.user=AuthService.getUserDetails()||{};
    console.log($scope.searchvalue);
    $scope.distance=0;
    
    $scope.user.profilepic=$scope.user.profilepic||'images/user.jpg';
    $rootScope.username=$scope.user.user||'User';
    $rootScope.userpoints=$scope.user.points||0;
    if($scope.user.user)
    {
        $rootScope.username=$scope.user.user||'User';
        $rootScope.userpoints=$scope.user.points||0;
    }
    
    
    $scope.homeposts=[];
    $scope.allposts=function(){
        $http.get('/api/allposts')
        .success(function(data) {
            $scope.homeposts = data;
            $scope.progressbar=false;
            console.log(data);
        })
        .error(function(data) {
            $scope.progressbar=false;
            console.log('Error: ' + data);
        });
    };
    $scope.allposts();
    navigator.geolocation.getCurrentPosition(pos1);
        $scope.coords=[];
            function pos1(po){
            $scope.coords[0]=po.coords.longitude;
            $scope.coords[1]=po.coords.latitude;
            return $scope.coords;
            }
    
    $scope.near=function(){
        if($scope.distance==0){
        $scope.allposts();
        }else{
            $scope.progressbar=true;
            $http.get('api/near',{params:{
                lon:$scope.coords[0],
                lat:$scope.coords[1],
                distance:$scope.distance||20
            }})
            .success(function(data) { 
            $scope.homeposts = data;
            $scope.progressbar=false;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }
    };        
    
    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
           window.location.reload(); 
        });

    };
        
                

}]);

app.controller('addpost',['$scope','$http','AuthService','$location',function($scope, $http,AuthService,$location) {
    console.log(AuthService.getUserDetails());
    $scope.Post={};
    navigator.geolocation.getCurrentPosition(pos);
        $scope.Post.coords=[];
            function pos(po){
            $scope.Post.coords[0]=po.coords.longitude;
            $scope.Post.coords[1]=po.coords.latitude;
            return $scope.Post.coords;
            }
    // $scope.Post={};
    $scope.user=AuthService.getUserDetails();
    // when submitting the add form, send the text to the node API
    $scope.createPost = function() {
        if(!AuthService.getUserStatus())
        {
            $location.path('/login');
        }
        
        
         console.log($scope.Post.coords);
        $scope.Post.User= $scope.user.id;
        console.log($scope.user.id);
        $http.post('/api/createpost', $scope.Post)
            .success(function(data) {
                 $location.path('/');  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
}]);

app.controller('getpost',['$scope','$http','AuthService','$location','$routeParams',function($scope, $http,AuthService,$location,$routeParams) {
    console.log(AuthService.getUserDetails());
    console.log($routeParams.id);
    // $scope.Post={};
    $scope.id=$routeParams.id;
    $scope.GetPost=function(){
        $scope.progressbar=true;
        $http.get('api/getpost',{params:{id:$scope.id}})
        .success(function(data){
            $scope.progressbar=false;
            $scope.PostDetail=data;
            console.log(data);
            $http.get('api/getcomments',{params:{id:$scope.PostDetail.comment}})
            .success(function(data){
                console.log(data);
                $scope.Comments=data[0];
            }).
            error(function(err){
            console.log('Error: ' + err);
            });
             })
        .error(function(err){
        console.log('Error: ' + err);
        });
    };
    $scope.GetPost();
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showModalButton.addEventListener('click', function() {
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
    
    $scope.PostComment=function(){
        $http.post('/api/comment', {params:{com:$scope.Comment,id:$scope.Comments._id}})
            .success(function(data) {
                 $location.path('/');  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };
    
    $scope.activity=[{
        title:'prithvi',
        content:'eretregtght'
    },
    {
        title:'prithvi',
        content:'eretregtght'
    }
    ];
    
}]);

app.controller('users',['$scope','$http','AuthService','$location','$routeParams',function($scope, $http,AuthService,$location,$routeParams) {
    $scope.allusers = function () {
        $http.get('api/users')
            .success(function (data) {
                $scope.progressbar = false;
                $scope.users = data;
                console.log(data);
            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
    }
        $scope.allusers();
        navigator.geolocation.getCurrentPosition(pos1);
        $scope.coords=[];
            function pos1(po){
            $scope.coords[0]=po.coords.longitude;
            $scope.coords[1]=po.coords.latitude;
            return $scope.coords;
            }
        $scope.unear=function(){
            if($scope.udistance==0){
            $scope.allusers();
            }else{
                $scope.progressbar=true;
                $http.get('api/unear',{params:{
                    lon:$scope.coords[0],
                    lat:$scope.coords[1],
                    distance:$scope.distance||20
                }})
                .success(function(data) { 
                $scope.users=data;
                $scope.progressbar=false;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    };
}]);