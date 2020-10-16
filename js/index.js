function TicTacToe() {
  this.set = function() {
        this.circle = `<svg height="100" width="100"><circle cx="50" cy="50" r="30" style = "stroke:#03A9F4;stroke-width:9;fill:white"   />Sorry, your browser does not support inline SVG.  </svg>`;
        this.cross = `<svg height="100" width="100"><line x1="100" y1="0" x2="0" y2="100" style="stroke:rgb(255,0,0);stroke-width:9" /><line x1="0" y1="0" x2="100" y2="100" style="stroke:rgb(255,0,0);stroke-width:9" />Sorry, your browser does not support inline SVG.</svg>`;
        this.whole = `<svg height="316" width="316"><line x1="316" y1="0" x2="0" y2="0" style="stroke:rgb(255,0,0);stroke-width:9" /><line x1="0" y1="316" x2="0" y2="0" style="stroke:rgb(255,0,0);stroke-width:4" /><line x1="0" y1="0" x2="316" y2="316" style="stroke:rgb(255,0,0);stroke-width:4" /><line x1="316" y1="0" x2="0" y2="316" style="stroke:rgb(255,0,0);stroke-width:4" /> Sorry, your browser does not support inline SVG. </svg>`;
        this.hrl = `<svg height="316" width="316"><line x1="316" y1="0" x2="0" y2="0" style="stroke:#FFC107;stroke-width:9" />Sorry, your browser does not support inline SVG.</svg>`;
        this.verl = `<svg height="316" width="316"><line x1="0" y1="316" x2="0" y2="0" style="stroke:#FFC107;stroke-width:9" />Sorry, your browser does not support inline SVG.</svg>`;
        this.leftdiag = `<svg height="316" width="316"><line x1="0" y1="0" x2="316" y2="316" style="stroke:#FFC107;stroke-width:9" />Sorry, your browser does not support inline SVG.</svg>`;
        this.rightdiag = `<svg height="316" width="316"><line x1="316" y1="0" x2="0" y2="316" style="stroke:#FFC107;stroke-width:9" />Sorry, your browser does not support inline SVG.</svg>`;



        // this.pln = prompt("Enter your name : ");
        this.destroy;
        this.show = '';
        this.turn = false;
        this.singlePlayer = document.querySelector('.b1');
        this.back = document.querySelector('.back');
        this.reset = document.querySelector('.reset');
        this.surface = document.querySelector('.surface-to-draw');
        this.slider = document.getElementsByClassName('r-labels')[0];
        this.game_ovr = document.querySelector('.game-over.show');
        this.turn_sign = document.querySelector('#turn-sign');
        this.main_menu = document.querySelector('.main-menu-component');
        this.main_comp = document.querySelector('.main-component');
        this.plname = document.getElementsByClassName("pname1")[0];
        this.btn = document.getElementsByClassName("b3")[0];
        this.game = document.getElementsByClassName("game-front")[0];
        this.cells =   document.querySelectorAll('.cell');
        this.cell = document.getElementsByClassName('cell');
        this.scoreChange = document.querySelector('.game-over');
        this.p1_score = document.getElementById('p1-score');
        this.p2_score = document.getElementById('p2-score');
        this.tie_score = document.getElementById('tie-score');
        this.matrices = [0,1,2,3,4,5,6,7,8]
        this.stack = [0,0,0,0,0,0,0,0,0];
        this.stackfreezed = []
        this.use = []
       
        this.input = (index) => {
              this.stackfreezed.push(index);
              this.stack[index] = (this.turn ? 1 : 2);
              // console.log('from input'+this.stack);
        }
        this.changeColor= function(obj,color1,color2) {
              obj.style.borderBottom = '6px solid '+(this.turn ? color1 : color2 );
        }

        this.changeState = function() {
          console.log('the turn :'+this.turn);
        this.changeColor(document.getElementsByClassName('turn')[0],'#03A9F4','red');
        this.changeColor(document.getElementsByClassName('p1')[0],'#03A9F4','white');
        this.changeColor(document.getElementsByClassName('p2')[0],'white','red');
        this.turn = !this.turn;
        this.turn_sign.innerText = (this.turn ? 'X' : 'O');
        return (this.turn ? this.circle : this.cross);
        }
        // this.plname.innerHTML = this.pln;
 
        this.singlePlayer.addEventListener('click',event => {
          this.main_menu.style.display = 'none';
          this.main_comp.style.display = 'flex';
        });
        this.back.addEventListener('click',event => {
          this.main_menu.style.display = 'flex';
          this.main_comp.style.display = 'none';
        });
        const wait = (n) => {
          return new Promise((resolve) => {
           this.destroy = setTimeout(() => resolve(), 1000 * n)
          })
        }
        
          
        
        this.cells.forEach((item,index) => {
          item.addEventListener('click',async (event) => { 
           this.control(index);
          if(this.check()==1 || this.check()==2) {
            this.scoreChange.classList.add('show');
            this.show = '.show';
            await wait(5);
            this.bot();

          }
          else setTimeout(this.bot,800) ;
          });
        });
        this.control = async (index) => {
          this.use = this.matrices.filter(x => !this.stackfreezed.includes(x));
        this.use.forEach(item => this.cell[item].classList.add('disabledbutton'));
         this.input(index);
            this.cell[index].innerHTML=this.changeState();
            this.cell[index].classList.add('disabledbutton');
            if(this.check()==1) {
              document.querySelector('.game-over').classList.add('show');
              this.show = '.show';
              this.p1_score.innerHTML = ((this.turn) ? parseInt(this.p1_score.innerText)+1 : this.p1_score.innerHTML); 
              this.p2_score.innerHTML = ((this.turn) ? this.p2_score.innerHTML : parseInt(this.p2_score.innerText)+1); 
              await wait(5)
              this.game_end();

            }
            else if(this.check()==2) {
              document.querySelector('.game-over').classList.add('show');
              this.show = '.show';
              this.tie_score.innerHTML = ((this.check()==2) ? parseInt(this.tie_score.innerText)+1 : this.tie_score.innerHTML);
              await wait(5)
              this.game_end();

            }


        }
        this.bot = () => {
          this.use = this.matrices.filter(x => !this.stackfreezed.includes(x));
        this.use.forEach(item => this.cell[item].classList.add('disabledbutton'));
          while(true) {
            var randint = Math.floor(Math.random() * 9);
            if(!this.stackfreezed.includes(randint)) {
              this.input(randint);
              break;
            }
          }
          this.control(randint);
          this.use = this.matrices.filter(x => !this.stackfreezed.includes(x));
          this.use.forEach(item => this.cell[item].classList.remove('disabledbutton'));
          
        }

        this.btn.addEventListener("click", () => {
          this.game.requestFullscreen().catch((e) => {
            console.log(e);
          });
        });
        this.game_end = () => {
          this.cells.forEach(item => {
            item.innerHTML="";
            item.classList.remove('disabledbutton');

          });
          document.querySelector('.game-over'+this.show).classList.remove('show');
          this.stack=[0,0,0,0,0,0,0,0,0];
          this.stackfreezed=[];
          this.use=[];
          this.surface.innerHTML="";
          this.surface.style.height = "0px";
          this.surface.style.width = "0px";
          this.surface.style.margin= "0px 0px 0px 0px";
          console.log('from game over'+this.stack+'\n stackfreezed : '+this.stackfreezed);

        }
        // document.querySelector('.game-over'+this.show).addEventListener('click',event => {
         
        //   this.game_end();
        // }); 
        this.reset.addEventListener('click',(event) => {
          this.cells.forEach(item => {
            item.innerHTML="";
            item.classList.remove('disabledbutton');
          });
          this.turn=false;
          this.tie_score.innerHTML=this.p2_score.innerHTML=this.p1_score.innerHTML = 0;
          this.stackfreezed = []
          this.use=[];
          this.surface.innerHTML="";
          this.surface.style.height = "0px";
          this.surface.style.width = "0px";
          this.surface.style.margin= "0px 0px 0px 0px";
          document.getElementsByClassName('p1')[0].style.borderBottom = document.getElementsByClassName('turn')[0].style.borderBottom = '6px solid #03A9F4';
          document.getElementsByClassName('p2')[0].style.borderBottom='6px solid white';
          this.stack=[0,0,0,0,0,0,0,0,0];
          this.turn_sign.innerText = 'O';
        });
 
  }
  
  this.check = () => {
    if (((this.stack[0]==1) && (this.stack[1]==1) && (this.stack[2]==1)) || ((this.stack[0]==2) && (this.stack[1]==2) && (this.stack[2]==2))){
        this.surface.style.height = "0px";
        this.surface.style.width = "316px";
        this.surface.style.marginTop = "-220px";
        this.surface.style.transition = "width 500ms";
        this.surface.innerHTML = this.hrl;
        

      //cross signs
        return 1;
    }
    else if (((this.stack[3]==1) && (this.stack[4]==1) && (this.stack[5]==1)) || ((this.stack[3]==2) && (this.stack[4]==2) && (this.stack[5]==2))){
      this.surface.style.height = "0px";
      this.surface.style.width = "316px";
      this.surface.style.marginTop = "0px";
      this.surface.style.transition = "width 500ms";
      this.surface.innerHTML = this.hrl;  
      
      //cross signs
        return 1;
    }
    else if (((this.stack[6]==1) && (this.stack[7]==1) && (this.stack[8]==1)) || ((this.stack[6]==2) && (this.stack[7]==2) && (this.stack[8]==2))){
      this.surface.style.height = "0px";
      this.surface.style.width = "316px";
      this.surface.style.marginTop = "220px";
      this.surface.style.transition = "width 500ms";
      this.surface.innerHTML = this.hrl;    
      //cross signs
        return 1;
    }
    else if (((this.stack[0]==1) && (this.stack[3]==1) && (this.stack[6]==1)) || ((this.stack[0]==2) && (this.stack[3]==2) && (this.stack[6]==2))){
      this.surface.style.height = "316px";
      this.surface.style.width = "0px";
      this.surface.style.marginLeft = "-220px";
      this.surface.style.transition = "height 500ms";
      this.surface.innerHTML = this.verl;        
      //cross signs
        return 1;
    }
    else if (((this.stack[1]==1) && (this.stack[4]==1) && (this.stack[7]==1)) || ((this.stack[1]==2) && (this.stack[4]==2) && (this.stack[7]==2))){
      this.surface.style.height = "316px";
      this.surface.style.width = "0px";
      this.surface.style.marginLeft = "0px";
      this.surface.style.transition = "height 500ms";
      this.surface.innerHTML = this.verl;     
      //cross signs
        return 1;
    }
    else if (((this.stack[2]==1) && (this.stack[5]==1) && (this.stack[8]==1)) || ((this.stack[2]==2) && (this.stack[5]==2) && (this.stack[8]==2))){
      this.surface.style.height = "316px";
      this.surface.style.width = "0px";
      this.surface.style.marginLeft = "220px";
      this.surface.style.transition = "height 500ms";
      this.surface.innerHTML = this.verl;      
      //cross signs
        return 1;
    }
    else if (((this.stack[2]==1) && (this.stack[4]==1) && (this.stack[6]==1)) || ((this.stack[2]==2) && (this.stack[4]==2) && (this.stack[6]==2))){
      this.surface.style.height = "316px";
      this.surface.style.width = "316px";
      this.surface.style.marginRight = "0px";
      this.surface.style.transition = "all 200ms";
      this.surface.innerHTML = this.rightdiag;  
     
      //cross signs
        return 1;
    }
    else if (((this.stack[0]==1) && (this.stack[4]==1) && (this.stack[8]==1)) || ((this.stack[0]==2) && (this.stack[4]==2) && (this.stack[8]==2))){
      this.surface.style.height = "316px";
      this.surface.style.width = "316px";
      // this.surface.style.marginLeft = "220px";
      this.surface.style.transition = "all 500ms";
      this.surface.innerHTML = this.leftdiag;         
      //cross signs
        return 1;
    }
    else if ((this.stack[0]==1 || this.stack[0]==2) && (this.stack[1]==1 || this.stack[1]==2) && (this.stack[2]==1 || this.stack[2]==2) && (this.stack[3]==1 || this.stack[3]==2) && (this.stack[4]==1 || this.stack[4]==2) && (this.stack[5]==1 || this.stack[5]==2) && (this.stack[6]==1 || this.stack[6]==2) && (this.stack[7]==1 || this.stack[7]==2) && (this.stack[8]==1 || this.stack[8]==2))
        return 2;
    else
        return 0;

}

  
 
 

 
}


function getFullscreenElement() {
  return document.fullscreenElement
  || document.webkitFullscreenElement
  || document.mozFullscreenElement
  || document.mskitFullscreenElement;
}
function gameLoop() {
  let game = new TicTacToe();
  game.set();

  
   
  
 
  
}





document.addEventListener("DOMContentLoaded",gameLoop);