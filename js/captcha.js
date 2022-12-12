(function(){
    const fonts = ["cursive", "sans-serif", "serif", "monospace"];
    let captchaValue = "";
    function generateCaptcha(){
        let value = btoa(Math.random()*1000000000);
        value = value.substring(0,4+Math.random()*4);
        captchaValue = value;
    }
    function setCaptcha(){
        let html = captchaValue.split("").map((char)=>{
            const rotate = -20 + Math.trunc(Math.random()*30);
            const font = Math.trunc(Math.random()*fonts.length);
            return `<span
                style="
                    transform:rotate(${rotate}deg);
                    font-family:${fonts[font]}
                "
            >${char}</span>`
        }).join("");
        document.querySelector(".box .form .captcha .preview").innerHTML = html;
    }
    function initCaptcha(){
        document.querySelector(".box .form .captcha .captcha-refresh").addEventListener("click",function(){
            generateCaptcha();
            setCaptcha();
        })
        generateCaptcha();
        setCaptcha();
    }
    initCaptcha();
    
    var modal = document.getElementById("myModal");
    var time_count = 3;
    var span_tag = document.getElementById("show_time");
    var countdown_call = "";

    document.querySelector(".box .form .form-input #submit-btn").addEventListener("click",function(){
        let inputCaptchaValue = document.querySelector(".box .form .captcha .captcha-form input").value;
        if(inputCaptchaValue === captchaValue){
            modal.style.display = "block";

            countdown_call = setInterval(updateTime, 1000);

            function updateTime(){
                time_count--;
                span_tag.innerHTML = time_count;

                if(time_count == 0){
                    clearInterval(countdown_call);
                    modal.style.display = "none";
                    location.href = "project.html";
                }
            }
        } else {
            window.alert("INVALID CAPTCHA");
        }
    });
})();