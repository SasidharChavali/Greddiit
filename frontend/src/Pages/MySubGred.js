import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
    Button,
    Box,
    Typography,
    IconButton,
    useTheme,
    Dialog,
    DialogContent,
    Stack, 
    Chip,
    Grid,
    TextField, 
  } from "@mui/material";
  import FlexBetween from "DisplayComponents/FlexBetween";
  import Dropzone from "react-dropzone";
  import { useState } from "react";
  import { //useDispatch, 
    useSelector } from "react-redux";
//  import { setSubGreds } from "./State";
import SubGreddiits from "./SubGreddiits";

  const MySubGred = ({ picturePath }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setImage(null);
      setName("");
      setDescription("");
      settags([]);
      setbanned([]);
      setOpen(false);
    }
    //const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, settags] = useState([]);
    const [banned, setbanned] = useState([]);
    const [helptag, sethelptag] = useState("");
    const [helpword, sethelpword] = useState("");

    const addtag = () => {
      console.log(helptag);
      let newtags = [].concat(tags, helptag);
      settags(newtags);
      sethelptag("");
    };
    const addbannedword = () => {
      console.log(helpword);
      let newwords = [].concat(banned, helpword);
      setbanned(newwords);
      sethelpword("");
    };
    
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
      const formData = new FormData();
      formData.append("moderatorId", _id);
      formData.append("Name", name);
      formData.append("Description", description);
      formData.append("Tags", tags);
      formData.append("Banned", banned);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/api/subgreddiits`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const subgreds = await response.json();
      console.log(subgreds);
      //dispatch(setSubGreds({ subgreds }));
      setImage(null);
      setName("");
      setDescription("");
      settags([]);
      setbanned([]);
      sethelpword("");
      sethelptag("");
      handleClose();
    }
    
    return (
      <>
     <Button onClick={handleOpen} endIcon={<AddIcon />}>CREATE SUBGREDDIIT</Button>
     <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Create SubGreddit
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handlePost}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    value={name}
                    autoComplete="given-name"
                    required
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    value={description}
                    required
                    fullWidth
                    multiline
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    label="Description"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                {isImage && (
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          )}
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
          </FlexBetween>
                </Grid>
         
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1}>
                    {tags.length !== 0 &&
                      tags.map((tag) => {
                        return <Chip label={tag} />;
                      })}
                  </Stack>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    id="tags"
                    label="Tags"
                    name="tags"
                    autoComplete="tags"
                    onChange={(e) => sethelptag(e.target.value)}
                    value={helptag}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="delete" onClick={addtag}>
                    <AddCircleIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1}>
                    {banned.length !== 0 &&
                      banned.map((tag) => {
                        return <Chip label={tag} />;
                      })}
                  </Stack>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    id="banned"
                    label="Banned Words"
                    name="banned"
                    autoComplete="new-word"
                    onChange={(e) => sethelpword(e.target.value)}
                    value={helpword}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="delete" onClick={addbannedword}>
                    <AddCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 5 }}
                onClick={handleClose}
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <SubGreddiits userId={_id}/>
    </>
    );
  };
  
export default MySubGred;
