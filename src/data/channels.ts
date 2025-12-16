export type Channel = {
  id: string;
  name: string;
  playlistId: string;
  note?: string;
};

export const channels90sIndia: Channel[] = [
  { id: "ads", name: "90s India Ads", playlistId: "PLh70ZuCbb80xTo_MSsshAwsWiODbmrLUT", note: "TV commercials" },
  { id: "bolly", name: "90s Bollywood Hits", playlistId: "PL7TL2bN_Nx76f874CwzC6e65GpgDzqOGt", note: "Songs & clips" },
  { id: "indipop", name: "90s IndiPop", playlistId: "PL_ftLhIxeNs8xcK7CKhrrOD-CiUbRqQJ3", note: "Pop classics" },
  { id: "dd", name: "Doordarshan 90s Vibes", playlistId: "PL6776HDRHD1sblFKDBH35reK0_4jrF4iF", note: "Intros / nostalgia" },
  { id: "cartoons", name: "90s Cartoons (India)", playlistId: "PLMp321X-FXg2G6zH0LBGO_aLNOz3SE7ZQ", note: "Hindi dubs / classics" },
  { id: "trailers", name: "90s Movie Trailers", playlistId: "PLn9S8xYhQmSIGfkaAI2rousC7XIO93q82", note: "Old promos" },
  { id: "Cricket", name: "90s Cricket", playlistId: "PLdz_rC7tjXMsTzrmR0eVxF-0xi0nXUYtD", note: "Old matches" }
];
