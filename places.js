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
  {
    id: "Chlum",
    name: "Zřícenina hradu Chlum",
    gps: "49.7862839N, 15.3693133E",
    img: "img/pre/Chlum.webp",
  },
  {
    id: "Kasperk",
    name: "Hrad Kašperk",
    gps: "49.1660328N, 13.5646764E",
    img: "img/pre/Kasperk.webp",
  },
  {
    id: "Klenova",
    name: "Zřícenina hradu Klenová",
    gps: "49.3318144N, 13.2287892E",
    img: "img/pre/Klenova.webp",
  },
  {
    id: "KociciHradek",
    name: "Kočičí Hrádek",
    gps: "49.9133108N, 15.7973667E",
    img: "img/pre/KociciHradek.webp",
  },
  {
    id: "Konigsmuhle",
    name: "Zaniklá osada Königsmühle",
    gps: "50.4092369N, 13.0103928E",
    img: "img/pre/Konigsmuhle.webp",
  },
  {
    id: "KostelSvBlazeje",
    name: "Kostel sv. Blažeje",
    gps: "49.9972311N, 13.0182039E",
    img: "img/pre/KostelSvBlazeje.webp",
  },
  {
    id: "KoziHrbet",
    name: "Zřícenina hradu Kozí hřbet",
    gps: "49.7243997N, 14.4296164E",
    img: "img/pre/KoziHrbet.webp",
  },
  {
    id: "KostelSvMikulase",
    name: "Zbytky kostela sv. Mikuláše",
    gps: "50.1470889N, 12.7298500E",
    img: "img/pre/KostelSvMikulase.webp",
  },
  {
    id: "LetohradekBelveder",
    name: "Zřícenina letohrádku Belvedér",
    gps: "49.9424719N, 15.1884044E",
    img: "img/pre/LetohradekBelveder.webp",
  },
  {
    id: "Macocha",
    name: "Propast Macocha",
    gps: "49.3732361N, 16.7298156E",
    img: "img/pre/Macocha.webp",
  },
  {
    id: "MilcanyII",
    name: "Zřícenina hradu Milčany II (Vítkovec)",
    gps: "50.6214275N, 14.4751825E",
    img: "img/pre/MilcanyII.webp",
  },
  {
    id: "ModlivyDul",
    name: "Modlivý důl",
    gps: "50.7262783N, 14.6045772E",
    img: "img/pre/ModlivyDul.webp",
  },
   {
    id: "MumlavskyVodopad",
    name: "Mumlavský vodopád",
    gps: "50.7706547N, 15.4532308E",
    img: "img/pre/MumlavskyVodopad.webp",
  },
   {
    id: "Neuberg",
    name: "Zřícenina hradu Neuberg",
    gps: "50.2551225N, 12.2068106E",
    img: "img/pre/Neuberg.webp",
  },
   {
    id: "ZriceninaOrlik",
    name: "Zřícenina hradu Orlík",
    gps: "49.5445419N, 15.3823381E",
    img: "img/pre/ZriceninaOrlik.webp",
  },
  {
    id: "ZlatyVoci",
    name: "Zlatý voči – Národní památník odposlechu",
    gps: "49.6161856N, 15.3935725E",
    img: "img/pre/ZlatyVoci.webp",
  },
  {
    id: "PanenskyTynec",
    name: "Nedokončený kostel Panny Marie",
    gps: "50.2961053N, 13.9167836E",
    img: "img/pre/PanenskyTynec.webp",
  },
  // { id: "", name: "", gps: "", img: "img/..." },
];
