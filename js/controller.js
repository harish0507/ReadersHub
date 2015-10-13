//controller definition
function readersHubController($scope, $http, Feed) {
    
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.invalidFeedUrl = false;
    
    //https get request for feeds
    $http.get("https://tecnotree-7.0x10.info/api/tecnotree?type=json&query=list_feed").then(function(response) {
       $scope.allFeeds = response.data.feed;
       $scope.constAllFeeds = response.data.feed;
       var feed_1 = $scope.constAllFeeds[0];
       $scope.loadFeed(feed_1.source, feed_1.feed_url);
       $scope.categories = [];
       jQuery.each($scope.allFeeds, function(index, value) {
        if (jQuery.inArray(value.category, $scope.categories) == -1) {
            $scope.categories.push(value.category);
        }
       });
    });
    
    //loads unique categories
    $scope.loadCategory = function(category) {
        $scope.allFeeds = [];
        jQuery.each($scope.constAllFeeds, function(index, value) {
            if(value.category === category) {
                $scope.allFeeds.push(value);
            }
       });
        var feed_1 = $scope.allFeeds[0];
        $scope.loadFeed(feed_1.source, feed_1.feed_url);
    };
    
    //https get request for api hits
    $http.get("https://tecnotree-7.0x10.info/api/tecnotree?type=json&query=api_hits").success(function(response) {
        $scope.apiHitsCount = response.api_hits;
    });
    
    
    //http get request for bookmarks from backend
    $http.get(window.location.href + "script/get_bookmarks.php").then(function(response) {
        if (response.data.length != 0) {
            $scope.bookmarks = response.data;
        }
    }, function(response) {
        console.log("Failed to get data!");
    });
    
    //filters bookmark
    $scope.filterBookmark = function(bookmark) {
        $scope.filterText = bookmark;
    };
    
    //adds to bookmark list
    $scope.addToBookmark = function(bookmark) {
        var request = $http({
            method: "POST",
            url: window.location.href + "script/add_bookmark.php",
            data: {
                bookmark: bookmark
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function(data) {
            $scope.bookmarks.push(bookmark);
        }, function(data) {
            console.log("Failed to save data in database!");
        });
    };
    
    //deletes all bookmarks
    $scope.clearBookmark = function() {
        var request = $http({
            method: "POST",
            url: window.location.href + "script/delete_bookmarks.php"
        });
        request.then(function(data) {
            $scope.bookmarks = [];    
        }, function(data) {
            console.log("Failed to delete data!");
        });
    };
    
    //loads new feeds
    $scope.loadFeed = function(name, url) {
        $scope.filterText = "";
        if (url === undefined) {
            url = $scope.customURL;
        }
        Feed.parseFeed(url).then(function(res) {
            $scope.loadButonText = name;
            try {
                $scope.invalidFeedUrl = false;
                $scope.feeds = res.data.responseData.feed.entries;
            } catch(err) {
                $scope.invalidFeedUrl = true;
                $scope.feeds = [];
            }
        });
    }
}