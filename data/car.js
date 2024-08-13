class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo(){
    return console.log(`${this.#brand} ${this.#model}, isTrunkOpen: ${this.isTrunkOpen},  Speed: ${this.speed} km/h`)
  };

  go(){
    if(this.speed + 5 <= 200 && this.isTrunkOpen === false){
      return this.speed += 5
    }
  };

  brake(){
    if(this.speed - 5 >= 0){
      return this.speed -= 5
    }
  };

  openTrunk(){
    if(this.speed > 0){
      return;
    }
    this.isTrunkOpen = true;
  }

  closeTrunk(){
    this.isTrunkOpen = false
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
   
  go(){
    this.speed += this.acceleration;
    if(this.speed > 300){
      this.speed = 300
    }
  }

  openTrunk(){
    console.log('Race car doesnt have trunk');
  }

  closeTrunk(){
    console.log('Race care doesnt have trunk')
  }

}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
const car3 = new RaceCar({brand:'McLaren', model:'F1', acceleration: 299});

console.log(car1);

console.log(car3.speed);
car3.go();
car3.displayInfo();
car3.go();
car3.displayInfo()
car3.openTrunk()
car3.brand = 'gegewepe';
car3.displayInfo();


