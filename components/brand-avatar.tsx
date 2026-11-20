export function BrandAvatar({initials,large=false}:{initials:string;large?:boolean}){
  const palette=["from-[#605ff2] to-[#968aff]","from-[#039c9b] to-[#62d5b8]","from-[#d6688d] to-[#f0a779]","from-[#4678cd] to-[#69c3db]","from-[#7352b7] to-[#d59bee]"];
  const index=[...initials].reduce((sum,char)=>sum+char.charCodeAt(0),0)%palette.length;
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${palette[index]} font-extrabold tracking-tight text-white shadow-md ${large?"h-14 w-14 text-xl":"h-10 w-10 text-sm"}`}>{initials}</span>;
}
