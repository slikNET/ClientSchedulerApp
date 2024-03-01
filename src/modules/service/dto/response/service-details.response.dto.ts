export class ServiceDetailsResponseDto {
  id: string;
  title: string;
  duration: string;
  //  TODO: need to check, because response is in format like below
  // duration: {
  //   hours: number;
  //   minutes?: number;
  // };
  price: number;
  color: string;
  createdAt: Date;
}
