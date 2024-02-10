export function dfsXyConv(code: string, v1: number, v2: number) {
  const { PI, tan, log, cos, pow, floor, sin } = Math;
  //
  // LCC DFS 좌표변환을 위한 기초 자료
  //
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기1준점 Y좌표(GRID)

  const DEGRAD = PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = tan(PI * 0.25 + slat2 * 0.5) / tan(PI * 0.25 + slat1 * 0.5);
  sn = log(cos(slat1) / cos(slat2)) / log(sn);
  let sf = tan(PI * 0.25 + slat1 * 0.5);
  sf = (pow(sf, sn) * cos(slat1)) / sn;
  let ro = tan(PI * 0.25 + olat * 0.5);
  ro = (re * sf) / pow(ro, sn);
  const rs: { lat: number; lon: number;x:number,y:number } = { lat: 0, lon: 0 ,x:0,y:0};
  let ra, theta;
  if (code === 'toXY') {
    rs.lat = v1;
    rs.lon = v2;
    ra = tan(PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / pow(ra, sn);
    theta = v2 * DEGRAD - olon;
    if (theta > PI) theta -= 2.0 * PI;
    if (theta < -PI) theta += 2.0 * PI;
    theta *= sn;
    rs.x = floor(ra * sin(theta) + XO + 0.5);
    rs.y = floor(ro - ra * cos(theta) + YO + 0.5);
  }
  return rs;
}
