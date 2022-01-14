import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const styles = () => ({
    default: {

    }
});

export default function MultiActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 700, height: "fit-content" }}>
            <CardActionArea sx={{ display: 'flex' }}>
            <CardContent variant="wrapperImageCard">

                <CardMedia
                variant="imageCard"
                    component="img"
                    image="https://spin.atomicobject.com/wp-content/uploads/classes.png"
                    alt="green iguana"
                />
                </CardContent>
                <CardContent variant="wrapperContentCard">
                    <Typography variant="categoryTypo">
                        category
                    </Typography>
                    <Typography gutterBottom variant="TitreCard" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="DesCard">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    <CardActions>
                        <Button variant="borderBtn" size="small" color="primary">
                            Share
                        </Button>
                        <Button variant="bleuBtn" size="small" color="primary">
                            Share
                        </Button>
                    </CardActions>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}