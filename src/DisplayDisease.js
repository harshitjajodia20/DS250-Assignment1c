import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles(theme => ({

  icon: {
    marginRight: theme.spacing(2)
  },
 
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
 
  cardContent: {
    flexGrow: 1
  },

}));


export default function Album({diseasesArr}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        
        <Container className={classes.cardGrid} maxWidth="md">
        <h2>Below are the top 10 diseases according to the symptoms provided</h2>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {diseasesArr.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                      Disease and probability
                    </Typography> */}
                    <Typography>
                      Disease Name 
                      <br/>
                      <span style={{color: 'red'}}>{Object.keys(card)}</span>
                      <hr/>
                    </Typography>
                    <Typography>
                      Probability 
                      <br/>
                      <span style={{color: 'red'}}>{Object.values(card)}</span>
                     
                    </Typography>
                  </CardContent>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    </React.Fragment>
  );
}
