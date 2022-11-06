import { ArtistRepository } from '../../domain/artist-repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from '../../domain/artist';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormArtistRepository implements ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly typeormArtistRepository: Repository<Artist>,
  ) {}

  async byName(name: string): Promise<Artist | null> {
    return await this.typeormArtistRepository.findOneBy({ name });
  }

  async add(artist: Artist): Promise<void> {
    await this.typeormArtistRepository.save(artist);
  }

  async byId(id: number): Promise<Artist | null> {
    return await this.typeormArtistRepository.findOneBy({ id });
  }

  async all(): Promise<Artist[]> {
    return await this.typeormArtistRepository.find();
  }
}
