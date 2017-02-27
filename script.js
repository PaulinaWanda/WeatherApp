$(document).ready(function(){
    var currentLocation="https://api.apixu.com/v1/current.json?key=cdf13b164a5b408c838100032162908&q=";
    $.ajax("http://ip-api.com/json",{
        error: function(){
            alert("Cannot connect with ip-api.com, sorry.");
        },
        success: function(json){
            $("div").html("<h1>"+json.city+"</h1><p>"+json.regionName+", "+json.country+"</p>");
            currentLocation += json.city;
            $.ajax(currentLocation,{
                error: function(){
                    alert("Cannot connect with api.apixu.com");
                },
                success: function (weather) {
                    var tempC = weather.current.temp_c;
                    var tempF = weather.current.temp_f;
                    if (tempC < 0){
                        $("body").addClass("frost");
                    } else if (tempC > 25){
                        $("body").addClass("hot");
                    } else {
                        $("body").addClass("moderate");
                    }
                    $("div").append("<img src='"+weather.current.condition.icon+"'/><p>"+weather.current.condition.text+"</p><div>Temperature: <a href=#>"+tempC+"°C</a></div>");
                    $("div a").on("click", function(event){
                        event.preventDefault();
                        if ($(this).text() ==tempC+"°C"){
                            $(this).text(tempF+"°F");
                        } else {
                            $(this).text(tempC+"°C");
                        }
                    });
                }
            });
        }
    });
});

