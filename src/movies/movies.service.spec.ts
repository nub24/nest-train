import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('Сервис определен', () => {
    expect(service).toBeDefined();
  });

  describe('Тестирование функции getAll', () => {
    it('Возвращается массив', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Тестирование функции getOne', () => {
    it('Возвращается фильм', () => {
      service.create({
        title: 'Test film',
        year: 2000,
        genres: ['test genre'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined;
    });

    it('Возвращается 404 ошибка', () => {
      try {
        service.getOne(777);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Тестирование функции remove', () => {
    it('Фильм удаляется', () => {
      service.create({
        title: 'Test film',
        year: 2000,
        genres: ['test genre'],
      });
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });
  });

  describe('Тестирование функции create', () => {
    it('Фильм создается', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test film',
        year: 2000,
        genres: ['test genre'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('Тестирование функции update', () => {
    it('Фильм изменен', () => {
      service.create({
        title: 'Test film',
        year: 2000,
        genres: ['test genre'],
      });
      service.update(1, { title: 'Updated test film' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated test film');
    });
  });
});
