import { Artist } from 'src/chinook/domainmodel/artist/artist';
import { ArtistRepository } from '../../domainmodel/artist/artist-repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class MikroormArtistRepository implements ArtistRepository {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Artist)
    private readonly artistRepository: EntityRepository<Artist>,
  ) {}

  async add(artist: Artist): Promise<void> {
    this.em.persist(artist);
    await this.em.flush();
  }

  async all(offset: number, limit: number): Promise<Artist[]> {
    return await this.artistRepository.findAll({ offset, limit });
  }

  async byId(id: number): Promise<Artist | null> {
    return await this.artistRepository.findOne({ id });
  }

  async byName(name: string): Promise<Artist | null> {
    return await this.artistRepository.findOne({ name });
  }
}
