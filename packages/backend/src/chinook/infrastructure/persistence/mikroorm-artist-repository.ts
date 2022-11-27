import { Artist } from 'src/chinook/domainmodel/artist/artist';
import { ArtistRepository } from '../../domainmodel/artist/artist-repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  TransactionContext,
} from '@mikro-orm/core';

@Injectable()
export class MikroormArtistRepository implements ArtistRepository {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Artist)
    private readonly artistRepository: EntityRepository<Artist>,
  ) {}

  async save(artist: Artist): Promise<void> {
    await this.em.persistAndFlush(artist);
  }

  async all(offset: number, limit: number): Promise<Artist[]> {
    return await this.artistRepository.findAll({ offset, limit });
  }

  async byId(id: number): Promise<Artist | null> {
    return await this.em.findOne(Artist, { id });
  }

  async byName(name: string): Promise<Artist | null> {
    return await this.artistRepository.findOne({ name });
  }

  async remove(artist: Artist): Promise<void> {
    return await this.artistRepository.removeAndFlush(artist);
  }
}
