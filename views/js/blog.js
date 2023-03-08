const navbar = document.getElementById('navbar')
         let scrolled = false;

        window.onscroll = function(e){
          e.preventDefault()
           const navbar = document.getElementById('navbar')
         let scrolled = false;

        window.onscroll = function(e){
          e.preventDefault()

            if(window.pageXOffset > 100){
              navbar.classList.remove('top') 
              if(!scrolled){
                  navbar.style.transform = 'translateY(-70px)'
              } 
              setTimeout(function(e) {
                e.preventDefault()

                navbar.style.transform = 'translateY(-70px)'
                scrolled = true   
              }, 200);
            }else{
                navbar.classList.add('top')
                scrolled = false;
    
            }
        }
            if(window.pageXOffset > 100){
              navbar.classList.remove('top') 
              if(!scrolled){
                  navbar.style.transform = 'translateY(-70px)'
              } 
              setTimeout(function(e) {
                e.preventDefault()
                
                navbar.style.transform = 'translateY(-70px)'
                scrolled = true   
              }, 200);
            }else{
                navbar.classList.add('top')
                scrolled= false;
            }
        }
