interface IProp extends React.ImgHTMLAttributes<HTMLImageElement> {
  scr: string;
}

const IconImg = ({ scr,...rest }: IProp) => {
  return <img src={scr} alt="" className="w-5 h-5" {...rest}/>;
};

export default IconImg;
