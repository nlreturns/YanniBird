// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');
// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // Load up everything
        
        // set background color
        game.stage.backgroundColor = '#C0D890';
        
        // load the bird
        game.load.image('bird', 'assets/birdo.jpg');
        
        //load the pipes
        game.load.image('pipe', 'assets/pipe.jpg');
        
        //load explosion
        game.load.image('explode', 'assets/explode.gif');
        
        // load girl
        game.load.image('woman',    'assets/test.png');
        
        // load audio
        game.load.audio('song', 'assets/song.mp3');
        
    },
    
    create: function() {
        // set up the game
        
        // set physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // display bird
        this.bird = this.game.add.sprite(100, 245, 'bird');
        
        // display woman
        this.woman = this.game.add.sprite(300, 240, 'woman');
        
        //play song
        this.sound = this.game.add.audio('song');
        this.sound.play();
        
        // set gravity
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        
        // add jump function
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        // add killstreak activate function
        var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.killstreak, this);
        
        // if reach 5, enable killstreak again
        this.countdown = 0;
        
        // create group
        this.pipes = game.add.group();
        
        // add physics to group
        this.pipes.enableBody = true;
        
        // create 20 pipes
        this.pipes.createMultiple(20, 'pipe');
        
        // add loop for adding pipes
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        // scoring
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff" });
        
        this.labelKillstreak = 0;
        
        //set all killstreaks to true
        this.killstreak1 = true;
        
        this.killstreak_ready = false;
    },
    
    update: function() {
        // This function is called 60 times per second
        // Game logic
        
        // if collision with pipe, restart
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        
        // if out-of-bound, restart
        if (this.bird.inWorld == false)
            this.restartGame();
        
        if(this.countdown == 5 && this.killstreak1 == true){
            this.killstreakready();
            this.killstreak1 == false;
        }
        
        if(this.killstreak1 == false){
            if(this.countdown > 4){
                this.killstreak1 == true;
                this.countdown = 0;
            }
        }
    }, 

    // Jumpie jumpie
    jump: function(){
        // add vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },
    
    killstreak: function(){
        // explode the next pipe
        
        //check if killstreak is ready
        if(this.killstreak_ready == true){
            // display explosion
            var explosion = this.game.add.sprite(200, 200, 'explode');
            game.physics.arcade.enable(explosion);
            explosion.body.velocity.x = -200;

            this.pipes.reset();

            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;

            this.labelKillstreak.text = this.score;
            
            this.killstreak_ready = false;
        }
    },
    
    // restart game
    restartGame: function(){
      // set to main state (start)
      this.sound.stop();
      game.state.start('main');
    },
    
    //add pipes
    addOnePipe: function(x, y){
        // get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();
        
        //set new position of pipe
        pipe.reset(x, y);
        
        //add velocity to the pipe to move it to the left
        pipe.body.velocity.x = -200;
        
        //kill of no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function(){
        // pick hole
        var hole = Math.floor(Math.random() * 5) + 1;
        
        //add pipes
        for (var i = 0; i < 10; i++)
            if(i != hole && i != hole + 1 && i != hole + 2)
                this.addOnePipe(400, i * 50);
        
        // higher score
        this.score += 1;
        this.countdown += 1;
        this.labelScore.text = this.score;
    },
    
    // killstreak1, unlocks at 5 points.
    killstreakready: function(){
        // logic for first killstreak
        this.labelKillstreak.text = game.add.text(20, 50, "Killstreak ready", {font: "20px Arial", fill: "#ffffff" });
        
        this.killstreak_ready = true;
    },
    
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
