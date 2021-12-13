/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata';
import { Container, Service, Inject } from 'typedi';

interface Factory {
  create(): void;
}

@Service({ id: 'bean.factory' })
class BeanFactory implements Factory {
  create() {
    console.log('BeanFactory called');
  }
}

@Service({ id: 'sugar.factory' })
class SugarFactory implements Factory {
  create() {
    console.log('SugarFactory called');
  }
}

@Service({ id: 'water.factory' })
class WaterFactory implements Factory {
  create() {
    console.log('WaterFactory called');
  }
}

@Service({ id: 'coffee.maker' })
class CoffeeMaker {
  beanFactory: Factory;
  sugarFactory: Factory;

  @Inject('water.factory')
  waterFactory: Factory;

  constructor(
    @Inject('bean.factory') beanFactory: BeanFactory,
    @Inject('sugar.factory') sugarFactory: SugarFactory,
  ) {
    this.beanFactory = beanFactory;
    this.sugarFactory = sugarFactory;
  }

  make() {
    this.beanFactory.create();
    this.sugarFactory.create();
    this.waterFactory.create();
  }
}

const coffeeMaker = Container.get<CoffeeMaker>('coffee.maker');
coffeeMaker.make();
