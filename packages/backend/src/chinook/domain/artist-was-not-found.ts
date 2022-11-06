export class ArtistWasNotFound extends Error {
  private constructor(message: string) {
    super(message);
    this.name = 'ArtistWasNotFound';
  }

  static withIdOf(artistId: number): ArtistWasNotFound {
    return new ArtistWasNotFound(
      `Artist with ID of ${artistId.toString()} was not found`,
    );
  }
}
