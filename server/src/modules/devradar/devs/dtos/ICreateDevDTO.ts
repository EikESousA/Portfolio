export default interface ICreateDevDTO {
  login: string;
  bio: string;
  avatar_url: string;
  github_username: string;
  techs: string[];
  location: {
    type: string;
    coordinates: number[];
  };
}
