function changeclass( num){
    var li = ["normal", "districtOffice", "government"];
    
    var _map = {"normal": "民眾登入", "districtOffice": "區公所登入", "government": "社會局登入"};


    for (var key in _map) {
        var val = document.getElementById(key);

        if ( num == key){
            val.style.display = "inline";
            document.getElementById("titleH1").innerText = _map[key];         
        }
        else {
            val.style.display = "none";
        }
    }



}