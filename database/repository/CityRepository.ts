import db from "@database/sqlite";
import { City } from "@database/repository/base/Entity";
import { CityRepository } from "@database/repository/base/InterfacesRepository";

export class SQLCityRepository implements CityRepository {
  async getAll(limit = 10, offset = 0): Promise<City[]> {
    const cities = await (await db).getAllAsync<City[]>(
      "SELECT * FROM city OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return cities.map((city: any) => new City(city.id, city.city));
  }

  async getById(id: string): Promise<City | null> {
    const city = await (await db).getFirstAsync<City>(
      "SELECT * FROM city WHERE id = ?",
      [id]
    );
    return city ? new City(city.id, city.city) : null;
  }

  async create(city: City): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO city (id, city) VALUES (?, ?)",
      [city.id, city.city]
    );
  }

  async update(city: City): Promise<void> {
    await (await db).runAsync(
      "UPDATE city SET city = ? WHERE id = ?",
      [city.city, city.id]
    );
  }

  async delete(id: string): Promise<void> {
    await (await db).runAsync("DELETE FROM city WHERE id = ?", [id]);
  }

  async getByCityName(cityName: string): Promise<City | null> {
    const city = await (await db).getFirstAsync<City>(
      "SELECT * FROM city WHERE city = ?",
      [cityName]
    );
    return city ? new City(city.id, city.city) : null;
  }
}