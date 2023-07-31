import WidgetWrapper from "DisplayComponents/WidgetWrapper";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { //setPosts,//, setSubGreds 
setSubGreds
} from "./State";
import SubGred from "./SubGred";
import Buffer from "DisplayComponents/Buffer"

const SubGreddiits = ({ userId }) => {
  const dispatch = useDispatch();

  const subgreds = useSelector((state) => state.subgreds);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const getUserSubGreddiits = async () => {
    const response = await fetch(
      `http://localhost:3001/api/subgreddiits/getmygreddits/${loggedInUserId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        //body: JSON.stringify({id: loggedInUserId}),
      }
    );
    const data = await response.json();
    //console.log("data is", data);
    dispatch(setSubGreds({ subgreds: data }));
  };

  useEffect(() => {
      getUserSubGreddiits();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {!subgreds && <Buffer/>}
       {subgreds.map(
        ({
          _id,
          moderatorId,
          Name,
          Description,
          picturePath,
          Tags,
          Banned,
          Followers,
          Posts,
        }) => (
          <SubGred
            key={_id}
            subgredId={_id}
            subgredUserId={moderatorId}
            name={Name}
            description={Description}
            picturePath={picturePath}
            tags={Tags}
            banned={Banned}
            Followers={Followers}
            Posts={Posts}
          />
        )
      )} 
    </WidgetWrapper>
  );
};

export default SubGreddiits;
