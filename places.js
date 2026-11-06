// Seznam míst – sem zapisuj nová místa.
// id: krátký název do URL (písmena bez diakritiky, čísla, - a _), stránka bude dokopcenejdu.cz/<id>
// name: název s diakritikou (popisek na mapě, nadpis stránky)
// gps: souřadnice zkopírované rovnou z mapy.cz, např. "50.8495258N, 14.2215303E"
// Po přidání místa spusť: node build.js (vytvoří kostru stránky <id>/index.html)
// img: obrázek na kartě po kliknutí na mapě (cesta od kořene webu)
const places = [
  {
    id: "Belveder",
    name: "Vyhlídka Belveder",
    gps: "50.8495258N, 14.2215303E",
    img: "img/pre/Belveder.webp",
  },
  {
    id: "Borotin",
    name: "Zřícenina Borotín",
    gps: "49.4995778N, 14.6290472E",
    img: "img/pre/Borotin.webp",
  },
  {
    id: "BozidarskeRaseliniste",
    name: "Božídarské rašeliniště",
    gps: "50.4024033N, 12.8967878E",
    img: "img/pre/Bozidar_raseliniste.webp",
  },
  {
    id: "Buben",
    name: "Zřícenina hradu Buben",
    gps: "49.7800414N, 13.1905653E",
    img: "img/pre/Buben.webp",
  },
  {
    id: "BuddhovyKameny",
    name: "Buddhovy kameny",
    gps: "50.4958258N, 15.7700283E",
    img: "img/pre/BuddhovyKameny.webp",
  },
  {
    id: "CerneJezero",
    name: "Černé jezero",
    gps: "49.1812253N, 13.1857425E",
    img: "img/pre/CerneJezero.webp",
  },
  {
    id: "CervenaJama",
    name: "Červená jáma",
    gps: "50.3927403N, 12.8158406E",
    img: "img/pre/CervenaJama.webp",
  },
  {
    id: "Cihost",
    name: "Geografický střed ČR",
    gps: "49.7437506N, 15.3386478E",
    img: "img/pre/Cihost.webp",
  },
  {
    id: "Hasistejn",
    name: "Zřícenina hradu Hasištejn",
    gps: "50.4450103N, 13.2572578E",
    img: "img/pre/Hasistejn.webp",
  },
  {
    id: "Helfstyn",
    name: "Hrad Helfštýn",
    gps: "49.5178683N, 17.6282706E",
    img: "img/pre/Helfstyn.webp",
  },
  {
    id: "ChebskyHrad",
    name: "Cheb",
    gps: "50.0811369N, 12.3660353E",
    img: "img/pre/ChebskyHrad.webp",
  },
  // { id: "", name: "", gps: "", img: "img/..." },
];
