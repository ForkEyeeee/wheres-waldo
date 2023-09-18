import { Image } from "@chakra-ui/react";
import whereswaldo from "../../public/assets/images/wheres-waldo.jpg";

export interface Props {
  handleClick: () => void;
}

const WheresWaldoImage: React.FC<Props> = props => {
  return (
    <Image
      className="app"
      role="pop-menu"
      onClick={props.handleClick}
      cursor={"crosshair"}
      src={whereswaldo}
    />
  );
};

export default WheresWaldoImage;
