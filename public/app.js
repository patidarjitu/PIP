var app = angular.module('myApp', ['ngRoute']);
//484360891751213 local
//210971289249607 global

window.fbAsyncInit = function() {
    FB.init({
      appId      : '210971289249607',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

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
    
app.controller('home',['$scope','$http','$rootScope','$location','$window',function($scope, $http,$rootScope,$location,$window) {
    
            $scope.user=[];
    $scope.fblogin=function(){
        
    FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(data) {
       console.log('Good to see you, ' + response + '.');
       
       FB.api(
        "/"+data.id+"/picture",
        function (response) {
        if (response && !response.error) {
            /* handle the result */
            
            $scope.fbloginDO(data,response)
        }
        }
    );
     });
    } else {
        console.log('User cancelled login or did not fully authorize.');
        }
    });
    
    $scope.fbloginDO=function(data,res){
        console.log(data);
        console.log(res);
        var userData={
            id:data.id,
            username:data.name,
            profilepic:res.data.url,
            location:$scope.coords
        };
        console.log(userData);
        $http.post('/fb/login',{params:userData}).success(function(data){
            console.log(data)
            $scope.user=data[0];
        }).error(function(err){
           console.log(err); 
        });
    }

    };
    
    $scope.progressbar=true;
    // 
    //  console.log(AuthService.getUserStatus());
    //     console.log(AuthService.getUserDetails());
    // $scope.user=AuthService.getUserDetails()||{};
    console.log($scope.searchvalue);
    $scope.distance=0;
    $scope.user.profilepic=$scope.user.profilepic||'images/user.jpg';
    
    
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
                

}]);

app.controller('addpost',['$scope','$http','$location',function($scope, $http,$location) {
    $scope.Post={};
    navigator.geolocation.getCurrentPosition(pos);
        $scope.Post.coords=[];
            function pos(po){
            $scope.Post.coords[0]=po.coords.longitude;
            $scope.Post.coords[1]=po.coords.latitude;
            return $scope.Post.coords;
            }
    // $scope.Post={};
    
    // when submitting the add form, send the text to the node API
    $scope.createPost = function() {
        
        
         console.log($scope.Post.coords);
        $scope.Post.User= $scope.user._id;
        console.log($scope.user._id);
        $http.post('/api/createpost', $scope.Post)
            .success(function(data) {
                 $location.path('/');  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

        
}]);

app.controller('getpost',['$scope','$http','$location','$routeParams',function($scope, $http,$location,$routeParams) {
    
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
        $http.post('/api/comment', {params:{com:$scope.Comment,id:$scope.Comments._id,
        user:$scope.user._id,username:$scope.user.username,profilepic:$scope.user.profilepic}})
            .success(function(data) {
                 $location.path('/');  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };
    
}]);    
app.controller('users',['$scope','$http','$location','$routeParams',function($scope, $http,$location,$routeParams) {
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
            };
        $scope.unear=function(){
            if($scope.udistance==0){
            $scope.allusers();
            }else{
                $scope.progressbar=true;
                $http.get('api/unear',{params:{
                    lon:$scope.coords[0],
                    lat:$scope.coords[1],
                    distance:$scope.udistance||20
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