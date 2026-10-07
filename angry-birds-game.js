(() => {
  // src/atoms/constants.js
  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var Runner = Matter.Runner;
  var Composites = Matter.Composites;
  var Events = Matter.Events;
  var Constraint = Matter.Constraint;
  var MouseConstraint = Matter.MouseConstraint;
  var Mouse = Matter.Mouse;
  var Composite = Matter.Composite;
  var Bodies = Matter.Bodies;
  var Body = Matter.Body;
  var RENDER_WIDTH = 1200;
  var RENDER_HEIGHT = 600;
  var BIRD_X = 250;
  var BIRD_Y = 450;
  var BIRD_SIZE_RED = 25;
  var BIRD_SIZE_CHUCK = 35;
  var BIRD_SIZE_BOMB = 40;
  var BIRD_SIZE_HAL = 38;
  var PIG_SIZE_MINION = 20;
  var PIG_SIZE_CORPORAL = 25;
  var PIG_SIZE_KING = 50;
  var OBSTACLE_SQUARE_LENGTH = 60;
  var GROUND_HEIGHT = 30;
  var GROUND_X = RENDER_WIDTH / 2;
  var GROUND_Y = RENDER_HEIGHT - GROUND_HEIGHT / 2;
  var Elastic_LEFT_X = BIRD_X - 18;
  var Elastic_RIGHT_X = BIRD_X + 6;
  var Elastic_Y = BIRD_Y + 5;
  var SLIGSHOT_BODY_X = BIRD_X - 6;
  var SLIGSHOT_BODY_Y = GROUND_Y - 75;

  // src/atoms/body.js
  var Body2 = class {
    constructor() {
      this.body = void 0;
    }
    getBody() {
      return this.body;
    }
  };

  // src/molecules/box.js
  var Box = class extends Body2 {
    constructor(x, y, w, h) {
      super();
      this.body = Matter.Bodies.rectangle(x, y, w, h);
    }
  };

  // src/molecules/ground.js
  var Ground = class extends Box {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.body.isStatic = true;
      this.body.friction = 0.6;
      this.body.render.fillStyle = "grey";
    }
  };

  // src/molecules/bird.js
  var Bird = class extends Body2 {
    constructor(x, y, r) {
      super();
      this.body = Matter.Bodies.circle(x, y, r, {
        density: 5e-3
      });
      this.isAbility = true;
    }
  };

  // src/organisms/birds/red-bird.js
  var RedBird = class extends Bird {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/birds/red.png";
      this.body.render.sprite.xScale = 0.4;
      this.body.render.sprite.yScale = 0.4;
    }
    // red bird ability
    ability() {
      if (this.isAbility) {
        console.log("I'm cute!!");
        this.isAbility = false;
      }
    }
  };

  // src/organisms/birds/chuck-bird.js
  var ChuckBird = class extends Bird {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/birds/chuck.png";
      this.body.render.sprite.xScale = 0.5;
      this.body.render.sprite.yScale = 0.5;
    }
    // chuck bird ability
    ability() {
      if (this.isAbility) {
        let body = this.body;
        if (body.force.x == 0) {
          body.force.x += 0.7;
          setTimeout(() => {
            body.force.x = 0;
          }, 500);
        }
        this.isAbility = false;
      }
    }
  };

  // src/organisms/birds/bomb-bird.js
  var BombBird = class extends Bird {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/birds/bomb.png";
      this.body.render.sprite.xScale = 0.4;
      this.body.render.sprite.yScale = 0.4;
    }
    // bomb bird ability
    ability() {
      if (this.isAbility) {
        let body = this.body;
        Matter.Body.scale(body, 2, 2);
        body.render.sprite.xScale = 0.8;
        body.render.sprite.yScale = 0.8;
        this.isAbility = false;
      }
    }
  };

  // src/organisms/birds/hal-bird.js
  var HalBird = class extends Bird {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/birds/hal.png";
      this.body.render.sprite.xScale = 0.6;
      this.body.render.sprite.yScale = 0.6;
    }
    // hal bird ability
    ability() {
      if (this.isAbility) {
        let body = this.body;
        if (body.force.x == 0) {
          body.force.x -= 0.5;
          setTimeout(() => {
            body.force.x -= 0.5;
          }, 100);
          setTimeout(() => {
            body.force.x -= 0.5;
          }, 100);
          setTimeout(() => {
            body.force.x -= 0.5;
          }, 100);
          setTimeout(() => {
            body.force.x -= 0.5;
          }, 100);
          body.force.y += 1.5;
          body.torque += 50;
          setTimeout(() => {
            body.force.x = 0;
            body.force.y = 0;
          }, 500);
        }
        this.isAbility = false;
      }
    }
  };

  // src/molecules/pig.js
  var Pig = class extends Body2 {
    constructor(x, y, r) {
      super();
      this.body = Matter.Bodies.circle(x, y, r, {
        density: 5e-3
      });
    }
  };

  // src/organisms/pigs/minion-pig.js
  var MinionPig = class extends Pig {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/pigs/minion-pig.png";
      this.body.render.sprite.xScale = 0.3;
      this.body.render.sprite.yScale = 0.3;
    }
  };

  // src/organisms/pigs/corporal-pig.js
  var CorporalPig = class extends Pig {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/pigs/corporal-pig.png";
      this.body.render.sprite.xScale = 0.4;
      this.body.render.sprite.yScale = 0.4;
    }
  };

  // src/organisms/pigs/king-pig.js
  var KingPig = class extends Pig {
    constructor(x, y, r) {
      super(x, y, r);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/pigs/king-pig.png";
      this.body.render.sprite.xScale = 0.7;
      this.body.render.sprite.yScale = 0.7;
    }
  };

  // src/templates/screens/home-screen.js
  var HomeScreen = class {
    constructor() {
      this.composites = [];
      this.groundTop = new Ground(GROUND_X, RENDER_HEIGHT - GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
      this.groundBottom = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
      this.groundLeft = new Ground(GROUND_HEIGHT / 2, RENDER_HEIGHT / 2, GROUND_HEIGHT, RENDER_HEIGHT);
      this.groundRight = new Ground(RENDER_WIDTH - GROUND_HEIGHT / 2, RENDER_HEIGHT / 2, GROUND_HEIGHT, RENDER_HEIGHT);
      this.RedBird = new RedBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_RED);
      this.ChuckBird = new ChuckBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_CHUCK);
      this.BombBird = new BombBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_BOMB);
      this.HalBird = new HalBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_HAL);
      this.MinionPig = new MinionPig(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, PIG_SIZE_MINION);
      this.CorporalPig = new CorporalPig(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, PIG_SIZE_CORPORAL);
      this.KingPig = new KingPig(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, PIG_SIZE_KING);
      this.composites.push(this.groundTop.getBody());
      this.composites.push(this.groundBottom.getBody());
      this.composites.push(this.groundLeft.getBody());
      this.composites.push(this.groundRight.getBody());
      this.composites.push(this.RedBird.getBody());
      this.composites.push(this.ChuckBird.getBody());
      this.composites.push(this.BombBird.getBody());
      this.composites.push(this.HalBird.getBody());
      this.composites.push(this.MinionPig.getBody());
      this.composites.push(this.CorporalPig.getBody());
      this.composites.push(this.KingPig.getBody());
    }
    getComposites() {
      return this.composites;
    }
    // add random body to render canvas
    addBody(world) {
      let newBody = new RedBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_RED);
      let rand = Math.floor(Math.random() * 7);
      if (rand == 0) {
        newBody = new RedBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_RED);
      } else if (rand == 1) {
        newBody = new ChuckBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_CHUCK);
      } else if (rand == 2) {
        newBody = new BombBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_BOMB);
      } else if (rand == 3) {
        newBody = new HalBird(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, BIRD_SIZE_HAL);
      } else if (rand == 4) {
        newBody = new MinionPig(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, PIG_SIZE_MINION);
      } else if (rand == 5) {
        newBody = new CorporalPig(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, PIG_SIZE_CORPORAL);
      } else if (rand == 6) {
        newBody = new KingPig(GROUND_HEIGHT + Math.random() * 1e3, GROUND_HEIGHT, PIG_SIZE_KING);
      }
      Composite.add(world, newBody.getBody());
    }
  };

  // src/molecules/elastic.js
  var Elastic = class extends Body2 {
    constructor(x, y, bird) {
      super();
      this.bird = bird;
      const options = {
        pointA: {
          x,
          y
        },
        bodyB: this.bird,
        stiffness: 0.05,
        render: {
          type: "line",
          strokeStyle: "#120E0A",
          lineWidth: 8
        }
      };
      this.body = Matter.Constraint.create(options);
    }
  };

  // src/organisms/slingshot/slingshot.js
  var Slingshot = class extends Body2 {
    constructor(bird) {
      super();
      this.bird = bird;
      this.elastic1 = new Elastic(Elastic_LEFT_X, Elastic_Y, this.bird.getBody());
      this.elastic2 = new Elastic(Elastic_RIGHT_X, Elastic_Y, this.bird.getBody());
      this.elastic1.body.render.visible = false;
      this.elastic2.body.render.visible = false;
      this.slingshotBody = new Box(SLIGSHOT_BODY_X, SLIGSHOT_BODY_Y, 0.1, 0.1);
      this.slingshotBody.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/img/slingshot.png";
      this.slingshotBody.body.render.sprite.xScale = 0.15;
      this.slingshotBody.body.render.sprite.yScale = 0.15;
      this.slingshotBody.body.isStatic = true;
    }
    getLeftElastic() {
      return this.elastic1.getBody();
    }
    getRightElastic() {
      return this.elastic2.getBody();
    }
    getSlingshotBody() {
      return this.slingshotBody.getBody();
    }
  };

  // src/organisms/obstacles/steel-square.js
  var SteelSquare = class extends Box {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/obstacles/steel-square.png";
      this.body.render.sprite.xScale = 0.75;
      this.body.render.sprite.yScale = 0.75;
      this.body.isStatic = true;
      this.body.friction = 0.6;
    }
  };

  // src/pages/subject.js
  var Subject = class {
    constructor() {
      this.observers = [];
    }
    subscribe(observer) {
      if (observer != null) this.observers.push(observer);
    }
    unsubscribe(observer) {
      if (observer == null) return;
      this.observers = this.observers.filter((e) => e != observer);
    }
    unsubscribeAll() {
      this.observers = [];
    }
    notifySubscribers(source, ...others) {
      for (let ob of this.observers) {
        if (ob != null) ob.update(source, ...others);
      }
    }
  };

  // src/templates/stages/tutorial-stage.js
  var TutorialStage = class extends Subject {
    constructor() {
      super();
      this.composites = [];
      this.remainingBirds = 3;
      this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
      this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
      this.slingshot = new Slingshot(this.bird);
      this.pig = new MinionPig(1e3, 300, PIG_SIZE_MINION);
      this.steelSquare = new SteelSquare(1e3, 400, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.composites.push(this.slingshot.getLeftElastic());
      this.composites.push(this.slingshot.getRightElastic());
      this.composites.push(this.slingshot.getSlingshotBody());
      this.composites.push(this.ground.getBody());
      this.composites.push(this.bird.getBody());
      this.composites.push(this.pig.getBody());
      this.composites.push(this.steelSquare.getBody());
      this.flyingBird = this.bird;
    }
    getComposites() {
      return this.composites;
    }
    // transmit information to ScoreDisplay
    updateScore(score2) {
      this.notifySubscribers(
        "update-score-stage1",
        { remainingBirds: this.remainingBirds },
        { scoreToAdd: score2 }
      );
    }
    // control bird firing
    firing(world) {
      let slingshot = this.slingshot;
      let bird = this.bird;
      if (this.remainingBirds == 3) {
        document.getElementById("rb-stage1-red1").style.display = "none";
      } else if (this.remainingBirds == 2) {
        document.getElementById("rb-stage1-red2").style.display = "none";
      } else if (this.remainingBirds == 1) {
        document.getElementById("rb-stage1-red3").style.display = "none";
      }
      this.remainingBirds -= 1;
      if (this.remainingBirds == 0) {
        slingshot.elastic1.body.bodyB = null;
        slingshot.elastic2.body.bodyB = null;
        Composite.remove(world, slingshot.getLeftElastic());
        Composite.remove(world, slingshot.getRightElastic());
      } else {
        let newBird = new RedBird(BIRD_X, BIRD_Y, 20);
        this.bird = newBird;
        bird = this.bird;
        Composite.add(world, bird.getBody());
        slingshot.elastic1.body.bodyB = bird.getBody();
        slingshot.elastic2.body.bodyB = bird.getBody();
      }
    }
  };

  // src/organisms/obstacles/wood-square.js
  var WoodSquare = class extends Box {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/obstacles/wood-square.png";
      this.body.render.sprite.xScale = 0.75;
      this.body.render.sprite.yScale = 0.75;
      this.body.friction = 0.8;
    }
  };

  // src/organisms/obstacles/ice-square.js
  var IceSquare = class extends Box {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.body.render.sprite.texture = "https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/obstacles/ice-square.png";
      this.body.render.sprite.xScale = 0.75;
      this.body.render.sprite.yScale = 0.75;
      this.body.friction = 0.05;
    }
  };

  // src/templates/stages/pyramid-stage.js
  var PyramidStage = class extends Subject {
    constructor() {
      super();
      this.composites = [];
      this.remainingBirds = 3;
      this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
      this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
      this.slingshot = new Slingshot(this.bird);
      this.pig1 = new MinionPig(710, 180, PIG_SIZE_MINION);
      this.pig2 = new MinionPig(650, 180, PIG_SIZE_MINION);
      this.pig3 = new CorporalPig(771, 180, PIG_SIZE_CORPORAL);
      this.pyramid = Matter.Composites.pyramid(500, 200, 7, 7, 0, 0, function(x, y) {
        let box;
        if (x == 620 || x == 740) {
          box = new IceSquare(x, y, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        } else {
          box = new WoodSquare(x, y, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        }
        return box.getBody();
      });
      this.flyingBird = this.bird;
      this.composites.push(this.slingshot.getLeftElastic());
      this.composites.push(this.slingshot.getRightElastic());
      this.composites.push(this.slingshot.getSlingshotBody());
      this.composites.push(this.ground.getBody());
      this.composites.push(this.bird.getBody());
      this.composites.push(this.pig1.getBody());
      this.composites.push(this.pig2.getBody());
      this.composites.push(this.pig3.getBody());
      this.composites.push(this.pyramid);
    }
    getComposites() {
      return this.composites;
    }
    // transmit information to ScoreDisplay
    updateScore(score2) {
      this.notifySubscribers(
        "update-score-stage2",
        { remainingBirds: this.remainingBirds },
        { scoreToAdd: score2 }
      );
    }
    // control bird firing
    firing(world) {
      let slingshot = this.slingshot;
      let bird = this.bird;
      if (this.remainingBirds == 3) {
        document.getElementById("rb-stage2-red1").style.display = "none";
      } else if (this.remainingBirds == 2) {
        document.getElementById("rb-stage2-chuck1").style.display = "none";
      } else if (this.remainingBirds == 1) {
        document.getElementById("rb-stage2-chuck2").style.display = "none";
      }
      this.remainingBirds -= 1;
      if (this.remainingBirds == 0) {
        slingshot.elastic1.body.bodyB = null;
        slingshot.elastic2.body.bodyB = null;
        Composite.remove(world, slingshot.getLeftElastic());
        Composite.remove(world, slingshot.getRightElastic());
      } else {
        let newBird = new ChuckBird(BIRD_X, BIRD_Y, BIRD_SIZE_CHUCK);
        this.bird = newBird;
        bird = this.bird;
        Composite.add(world, bird.getBody());
        slingshot.elastic1.body.bodyB = bird.getBody();
        slingshot.elastic2.body.bodyB = bird.getBody();
      }
    }
  };

  // src/templates/stages/two-pyramid-stage.js
  var TwoPyramidStage = class extends Subject {
    constructor() {
      super();
      this.composites = [];
      this.remainingBirds = 3;
      this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
      this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
      this.slingshot = new Slingshot(this.bird);
      this.pig1 = new MinionPig(990, 300, PIG_SIZE_MINION);
      this.pig2 = new KingPig(960, 170, PIG_SIZE_KING);
      this.pig3 = new MinionPig(930, 300, PIG_SIZE_MINION);
      this.pig4 = new MinionPig(1050, 300, PIG_SIZE_MINION);
      this.steelSquare1 = new SteelSquare(900, 250, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.steelSquare2 = new SteelSquare(960, 250, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.steelSquare3 = new SteelSquare(1020, 250, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.pyramid = Matter.Composites.pyramid(840, 400, 5, 5, 0, 0, function(x, y) {
        let box = new WoodSquare(x, y, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        return box.getBody();
      });
      this.flyingBird = this.bird;
      this.composites.push(this.slingshot.getLeftElastic());
      this.composites.push(this.slingshot.getRightElastic());
      this.composites.push(this.slingshot.getSlingshotBody());
      this.composites.push(this.ground.getBody());
      this.composites.push(this.bird.getBody());
      this.composites.push(this.pig1.getBody());
      this.composites.push(this.pig2.getBody());
      this.composites.push(this.pig3.getBody());
      this.composites.push(this.pig4.getBody());
      this.composites.push(this.steelSquare1.getBody());
      this.composites.push(this.steelSquare2.getBody());
      this.composites.push(this.steelSquare3.getBody());
      this.composites.push(this.pyramid);
    }
    getComposites() {
      return this.composites;
    }
    // transmit information to ScoreDisplay
    updateScore(score2) {
      this.notifySubscribers(
        "update-score-stage3",
        { remainingBirds: this.remainingBirds },
        { scoreToAdd: score2 }
      );
    }
    // control bird firing
    firing(world) {
      let slingshot = this.slingshot;
      let bird = this.bird;
      let newBird;
      if (this.remainingBirds == 3) {
        document.getElementById("rb-stage3-red1").style.display = "none";
        newBird = new ChuckBird(BIRD_X, BIRD_Y, BIRD_SIZE_CHUCK);
      } else if (this.remainingBirds == 2) {
        document.getElementById("rb-stage3-chuck1").style.display = "none";
        newBird = new BombBird(BIRD_X, BIRD_Y, BIRD_SIZE_BOMB);
      } else if (this.remainingBirds == 1) {
        document.getElementById("rb-stage3-bomb1").style.display = "none";
      }
      this.remainingBirds -= 1;
      if (this.remainingBirds == 0) {
        slingshot.elastic1.body.bodyB = null;
        slingshot.elastic2.body.bodyB = null;
        Composite.remove(world, slingshot.getLeftElastic());
        Composite.remove(world, slingshot.getRightElastic());
      } else {
        this.bird = newBird;
        bird = this.bird;
        Composite.add(world, bird.getBody());
        slingshot.elastic1.body.bodyB = bird.getBody();
        slingshot.elastic2.body.bodyB = bird.getBody();
      }
    }
  };

  // src/templates/stages/boomerang-stage.js
  var BoomerangStage = class extends Subject {
    constructor() {
      super();
      this.composites = [];
      this.remainingBirds = 3;
      this.bird = new HalBird(BIRD_X, BIRD_Y, BIRD_SIZE_HAL);
      this.ground1 = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
      this.slingshot = new Slingshot(this.bird);
      this.pig = new CorporalPig(800, 480, PIG_SIZE_CORPORAL);
      this.steelSquare1 = new SteelSquare(600, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.steelSquare2 = new SteelSquare(600, 480, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.steelSquare3 = new SteelSquare(600, 420, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.steelSquare4 = new SteelSquare(800, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
      this.flyingBird = this.bird;
      this.composites.push(this.slingshot.getLeftElastic());
      this.composites.push(this.slingshot.getRightElastic());
      this.composites.push(this.slingshot.getSlingshotBody());
      this.composites.push(this.ground1.getBody());
      this.composites.push(this.bird.getBody());
      this.composites.push(this.pig.getBody());
      this.composites.push(this.steelSquare1.getBody());
      this.composites.push(this.steelSquare2.getBody());
      this.composites.push(this.steelSquare3.getBody());
      this.composites.push(this.steelSquare4.getBody());
    }
    getComposites() {
      return this.composites;
    }
    // transmit information to ScoreDisplay
    updateScore(score2) {
      this.notifySubscribers(
        "update-score-stage4",
        { remainingBirds: this.remainingBirds },
        { scoreToAdd: score2 }
      );
    }
    // control bird firing
    firing(world) {
      let slingshot = this.slingshot;
      let bird = this.bird;
      let newBird;
      if (this.remainingBirds == 3) {
        document.getElementById("rb-stage4-hal1").style.display = "none";
        newBird = new HalBird(BIRD_X, BIRD_Y, BIRD_SIZE_HAL);
      } else if (this.remainingBirds == 2) {
        document.getElementById("rb-stage4-hal2").style.display = "none";
        newBird = new HalBird(BIRD_X, BIRD_Y, BIRD_SIZE_HAL);
      } else if (this.remainingBirds == 1) {
        document.getElementById("rb-stage4-hal3").style.display = "none";
      }
      this.remainingBirds -= 1;
      if (this.remainingBirds == 0) {
        slingshot.elastic1.body.bodyB = null;
        slingshot.elastic2.body.bodyB = null;
        Composite.remove(world, slingshot.getLeftElastic());
        Composite.remove(world, slingshot.getRightElastic());
      } else {
        this.bird = newBird;
        bird = this.bird;
        Composite.add(world, bird.getBody());
        slingshot.elastic1.body.bodyB = bird.getBody();
        slingshot.elastic2.body.bodyB = bird.getBody();
      }
    }
  };

  // src/templates/screens/score-display.js
  var ScoreDisplay = class {
    constructor() {
      this.remainingBirds = 3;
      this.score_stage1 = 0;
      this.score_stage2 = 0;
      this.score_stage3 = 0;
      this.score_stage4 = 0;
      this.score_stage1_high = 0;
      this.score_stage2_high = 0;
      this.score_stage3_high = 0;
      this.score_stage4_high = 0;
    }
    // update score if user get high record
    updateStar(stageName2) {
      this.storeHighScore();
      if (stageName2 == "stage1") {
        if (this.score_stage1_high == 1) {
          document.getElementById("score1").innerHTML = `r\xE9cord : \u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
          document.getElementById("stage1-star").innerHTML = `\u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
        }
      } else if (stageName2 == "stage2") {
        if (this.score_stage2_high == 1) {
          document.getElementById("score2").innerHTML = `r\xE9cord : \u2B50\uFE0F`;
          document.getElementById("stage2-star").innerHTML = `\u2B50\uFE0F`;
        } else if (this.score_stage2_high > 1 && this.score_stage2_high < 4) {
          document.getElementById("score2").innerHTML = `r\xE9cord : \u2B50\uFE0F \u2B50\uFE0F`;
          document.getElementById("stage2-star").innerHTML = `\u2B50\uFE0F \u2B50\uFE0F`;
        } else if (this.score_stage2_high == 4) {
          document.getElementById("score2").innerHTML = `r\xE9cord : \u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
          document.getElementById("stage2-star").innerHTML = `\u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
        }
      } else if (stageName2 == "stage3") {
        if (this.score_stage3_high == 1 || this.score_stage3_high == 2) {
          document.getElementById("score3").innerHTML = `r\xE9cord : \u2B50\uFE0F`;
          document.getElementById("stage3-star").innerHTML = `\u2B50\uFE0F`;
        } else if (this.score_stage3_high > 2 && this.score_stage3_high < 6) {
          document.getElementById("score3").innerHTML = `r\xE9cord : \u2B50\uFE0F \u2B50\uFE0F`;
          document.getElementById("stage3-star").innerHTML = `\u2B50\uFE0F \u2B50\uFE0F`;
        } else if (this.score_stage3_high == 6) {
          document.getElementById("score3").innerHTML = `r\xE9cord : \u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
          document.getElementById("stage3-star").innerHTML = `\u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
        }
      } else if (stageName2 == "stage4") {
        if (this.score_stage4_high == 2) {
          document.getElementById("score4").innerHTML = `r\xE9cord : \u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
          document.getElementById("stage4-star").innerHTML = `\u2B50\uFE0F \u2B50\uFE0F \u2B50\uFE0F`;
        }
      }
    }
    // store high score in class
    storeHighScore() {
      if (this.score_stage1 > this.score_stage1_high) {
        this.score_stage1_high = this.score_stage1;
      } else if (this.score_stage2 > this.score_stage2_high) {
        this.score_stage2_high = this.score_stage2;
      } else if (this.score_stage3 > this.score_stage3_high) {
        this.score_stage3_high = this.score_stage3;
      } else if (this.score_stage4 > this.score_stage4_high) {
        this.score_stage4_high = this.score_stage4;
      }
    }
    // receive information from stages
    update(source, ...others) {
      if (source == "update-score-stage1") {
        const { remainingBirds } = others[0];
        const { scoreToAdd } = others[1];
        this.score_stage1 += scoreToAdd;
        this.remainingBirds = remainingBirds;
        this.updateStar("stage1");
      } else if (source == "update-score-stage2") {
        const { remainingBirds } = others[0];
        const { scoreToAdd } = others[1];
        this.score_stage2 += scoreToAdd;
        this.remainingBirds = remainingBirds;
        this.updateStar("stage2");
      } else if (source == "update-score-stage3") {
        const { remainingBirds } = others[0];
        const { scoreToAdd } = others[1];
        this.score_stage3 += scoreToAdd;
        this.remainingBirds = remainingBirds;
        this.updateStar("stage3");
      } else if (source == "update-score-stage4") {
        const { remainingBirds } = others[0];
        const { scoreToAdd } = others[1];
        this.score_stage4 += scoreToAdd;
        this.remainingBirds = remainingBirds;
        this.updateStar("stage4");
      }
    }
  };

  // src/pages/main.js
  var stage1 = document.getElementById("stage1");
  var stage2 = document.getElementById("stage2");
  var stage3 = document.getElementById("stage3");
  var stage4 = document.getElementById("stage4");
  var playHomeButton = document.getElementById("play-home");
  var restartButton = document.getElementById("restart-btn");
  var homeButton = document.getElementById("home-btn");
  var stageButton = document.getElementById("stage-btn");
  var score;
  var engine;
  var render;
  var mouse;
  var runner;
  var mouseConstraint;
  var homeScreen;
  var tutorialStage;
  var pyramidStage;
  var twoPyramidStage;
  var boomerangStage;
  var stageName = "home";
  var firing = false;
  function setup() {
    createCanvas(0, 0);
    score = new ScoreDisplay();
    engine = Engine.create();
    render = Render.create({
      element: document.body,
      engine,
      options: {
        width: RENDER_WIDTH,
        height: RENDER_HEIGHT,
        showAngleIndicator: false,
        wireframes: false,
        background: "transparent"
      }
    });
    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);
    mouse = Mouse.create(render.canvas);
    mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.05,
        render: {
          visible: false
        }
      }
    });
    render.mouse = mouse;
  }
  function draw() {
    if (stageName == "home") {
      Composite.clear(engine.world);
      homeScreen = new HomeScreen();
      addComposites(homeScreen);
    } else if (stageName == "tutorial") {
      Composite.clear(engine.world);
      score.score_stage1 = 0;
      tutorialStage = new TutorialStage();
      getStage(tutorialStage);
    } else if (stageName == "pyramid") {
      Composite.clear(engine.world);
      score.score_stage2 = 0;
      pyramidStage = new PyramidStage();
      getStage(pyramidStage);
    } else if (stageName == "twoPyramid") {
      Composite.clear(engine.world);
      score.score_stage3 = 0;
      twoPyramidStage = new TwoPyramidStage();
      getStage(twoPyramidStage);
    } else if (stageName == "boomerang") {
      Composite.clear(engine.world);
      score.score_stage4 = 0;
      boomerangStage = new BoomerangStage();
      getStage(boomerangStage);
    }
    noLoop();
  }
  stage1.addEventListener("click", function(event) {
    event.preventDefault();
    resetStage("tutorial");
  });
  stage2.addEventListener("click", function(event) {
    event.preventDefault();
    resetStage("pyramid");
  });
  stage3.addEventListener("click", function(event) {
    event.preventDefault();
    resetStage("twoPyramid");
  });
  stage4.addEventListener("click", function(event) {
    event.preventDefault();
    resetStage("boomerang");
  });
  playHomeButton.addEventListener("click", function(event) {
    event.preventDefault();
    let awaitReset = new Promise((resolve) => {
      stageName = "selectStage";
      setTimeout(function() {
        resolve("success");
      }, 100);
    });
    awaitReset.then(() => {
      loop();
    });
  });
  restartButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (stageName == "tutorial") {
      score.score_stage1 = 0;
      document.getElementById("rb-stage1-red1").style.display = "flex";
      document.getElementById("rb-stage1-red2").style.display = "flex";
      document.getElementById("rb-stage1-red3").style.display = "flex";
    } else if (stageName == "pyramid") {
      score.score_stage2 = 0;
      document.getElementById("rb-stage2-red1").style.display = "flex";
      document.getElementById("rb-stage2-chuck1").style.display = "flex";
      document.getElementById("rb-stage2-chuck2").style.display = "flex";
    } else if (stageName == "twoPyramid") {
      score.score_stage3 = 0;
      document.getElementById("rb-stage3-red1").style.display = "flex";
      document.getElementById("rb-stage3-chuck1").style.display = "flex";
      document.getElementById("rb-stage3-bomb1").style.display = "flex";
    } else if (stageName == "boomerang") {
      score.score_stage4 = 0;
      document.getElementById("rb-stage4-hal1").style.display = "flex";
      document.getElementById("rb-stage4-hal2").style.display = "flex";
      document.getElementById("rb-stage4-hal3").style.display = "flex";
    }
    resetStage(stageName);
  });
  homeButton.addEventListener("click", function(event) {
    event.preventDefault();
    resetStage("home");
  });
  stageButton.addEventListener("click", function(event) {
    event.preventDefault();
    resetStage("home");
  });
  function keyPressed() {
    if (key == " ") {
      if (stageName == "tutorial") {
        if (tutorialStage.remainingBirds >= 0) {
          tutorialStage.flyingBird.ability();
        }
      } else if (stageName == "pyramid") {
        if (pyramidStage.remainingBirds >= 0) {
          pyramidStage.flyingBird.ability();
        }
      } else if (stageName == "twoPyramid") {
        if (twoPyramidStage.remainingBirds >= 0) {
          twoPyramidStage.flyingBird.ability();
        }
      } else if (stageName == "boomerang") {
        if (boomerangStage.remainingBirds >= 0) {
          boomerangStage.flyingBird.ability();
        }
      }
    }
  }
  function mousePressed() {
    if (stageName == "home" || stageName == "selectStage") {
      homeScreen.addBody(engine.world);
    }
  }
  function resetEvents() {
    if (stageName == "tutorial" || stageName == "pyramid" || stageName == "twoPyramid" || stageName == "boomerang") {
      Events.off(mouseConstraint, "enddrag");
      Events.off(engine, "afterUpdate");
    }
  }
  function firingEvents(stage) {
    if (stage.remainingBirds > 0) {
      Events.on(mouseConstraint, "startdrag", function() {
        setTimeout(function() {
          stage.slingshot.elastic1.body.render.visible = true;
          stage.slingshot.elastic2.body.render.visible = true;
        }, 100);
      });
      Events.on(mouseConstraint, "enddrag", function(event) {
        stage.flyingBird = stage.bird;
        stage.slingshot.elastic1.body.render.visible = false;
        stage.slingshot.elastic2.body.render.visible = false;
        if (event.body == stage.bird.body) {
          firing = true;
          stage.remaingBirds -= 1;
        }
      });
      Events.on(engine, "afterUpdate", function() {
        addScore(stage);
        if (firing && Math.abs(stage.bird.body.position.x - BIRD_X) < 20 && Math.abs(stage.bird.body.position.y - BIRD_Y) < 20 && stage.remainingBirds > 0) {
          stage.firing(engine.world);
          firing = false;
        }
      });
    }
  }
  function addScore(stage) {
    let score2 = 0;
    if (stageName == "tutorial") {
      if (stage.pig.body.position.x > RENDER_WIDTH) {
        stage.pig.body.position.x = -100;
        score2 += 1;
        stage.updateScore(score2);
      }
    } else if (stageName == "pyramid") {
      if (stage.pig1.body.position.x > RENDER_WIDTH) {
        stage.pig1.body.position.x = -100;
        score2 += 1;
        stage.updateScore(score2);
      } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
        stage.pig2.body.position.x = -100;
        score2 += 1;
        stage.updateScore(score2);
      } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
        stage.pig3.body.position.x = -100;
        score2 += 2;
        stage.updateScore(score2);
      }
    } else if (stageName == "twoPyramid") {
      if (stage.pig1.body.position.x > RENDER_WIDTH) {
        stage.pig1.body.position.x = -100;
        score2 += 1;
        stage.updateScore(score2);
      } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
        stage.pig2.body.position.x = -100;
        score2 += 3;
        stage.updateScore(score2);
      } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
        stage.pig3.body.position.x = -100;
        score2 += 1;
        stage.updateScore(score2);
      } else if (stage.pig4.body.position.x > RENDER_WIDTH) {
        stage.pig4.body.position.x = -100;
        score2 += 1;
        stage.updateScore(score2);
      }
    } else if (stageName == "boomerang") {
      if (stage.pig.body.position.x < 700) {
        stage.pig.body.position.x = -100;
        score2 += 2;
        stage.updateScore(score2);
      }
    }
  }
  function addComposites(stage) {
    Composite.add(engine.world, stage.getComposites());
    Composite.add(engine.world, mouseConstraint);
  }
  function getStage(stage) {
    let getStageComposite = new Promise((resolve) => {
      addComposites(stage);
      setTimeout(function() {
        resolve("success");
      }, 250);
    });
    getStageComposite.then(() => {
      stage.subscribe(score);
      firingEvents(stage);
    });
  }
  function resetStage(stage) {
    let awaitReset = new Promise((resolve) => {
      resetEvents();
      setTimeout(function() {
        resolve("success");
      }, 100);
    });
    awaitReset.then(() => {
      stageName = stage;
    }).then(() => {
      loop();
    });
  }
  window.setup = setup;
  window.draw = draw;
  window.keyPressed = keyPressed;
  window.mousePressed = mousePressed;
})();
