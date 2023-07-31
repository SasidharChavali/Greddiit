import WidgetWrapper from "DisplayComponents/WidgetWrapper";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { //setPosts,//, setSubGreds 
setSubGreds
} from "./State";
import AllSubGred from "./AllSubGred";

const AllSubGreddiitsWidget = () => {
  const dispatch = useDispatch();
  const subgreds = useSelector((state) => state.subgreds);
  const token = useSelector((state) => state.token);

  const getSubGreddiits = async () => {
    const response = await fetch("http://localhost:3001/api/subgreddiits", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    //console.log(data)
    dispatch(setSubGreds({ subgreds: data }));
  };

  useEffect(() => {
    getSubGreddiits();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
       {subgreds.map(
        ({
          _id,
          moderatorId,
          Name,
          Description,
          picturePath,
          //userPicturePath,
          Tags,
          Banned,
          Followers,
          Posts,
          Reports,

        }) => (
          <AllSubGred
            key={_id}
            subgredId={_id}
            subgredUserId={moderatorId}
            name={Name}
            description={Description}
            picturePath={picturePath}
            //userPicturePath={userPicturePath}
            tags={Tags}
            banned={Banned}
            followers={Followers}
            Posts={Posts}
            Reports={Reports}
          />
        )
      )} 
    </WidgetWrapper>
  );
};

export default AllSubGreddiitsWidget;
