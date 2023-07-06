import React from 'react';
import { Link } from "react-router-dom";
import { apiURL } from '@/common/constants';
import { Grid, Card, Typography, CardContent, CardMedia, Button, CardActions } from '@mui/material';
import imageNotAvailable from '@/assets/images/text.jpg';
import { CheckerUser } from '@/helpers/CheckerUser';

interface Props {
  userName: string;
  title: string;
  image?: string;
  datetime: Date;
  id: string;
  user_id:string
  deletePost(id: string): void;
  description?:string
  showDescription?:boolean
}

const stylesHSeries = {
  color:'gray',
  fontWeight:'800'
}


const PostItem = ({ userName, title, image, datetime, id, user_id, deletePost ,description = '', showDescription = false}: Props) => {

  let cardImage = imageNotAvailable;
  const date = new Date(datetime);
  
  if (image) {
    cardImage = `${apiURL}/post/${image}`
  }
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} minWidth={350}>
      <Card sx={{ height: "100%", maxWidth: 345 }}>
        {cardImage ? <CardMedia sx={{ height: 290, paddingTop: 25 }} image={cardImage} title={title} /> : null}
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div"
            sx={stylesHSeries}
            >
            {`${userName}: ${title}`}
          </Typography>
          {
              description && <Typography 
              gutterBottom 
              variant="h5" 
              component="div"
              sx={stylesHSeries}
              >
                  {`${description}`}
                </Typography>
          }
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={stylesHSeries}>
            {`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}
          </Typography>
          <CardActions>
            {
              !showDescription && <Button 
              component={Link} 
              to={'/postById/' + id} 
              size="small"
              >Прочитать весь пост</Button>
            }
            {
              CheckerUser(user_id) ? <Button  onClick={() => deletePost(id)} size="small">Удалить</Button> : null
            } 
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostItem;