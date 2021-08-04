import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import BLUE from "../../utils/Color";

export default function InvalidVoucher(props) {
  const classes = props.classes;

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid
        container
        spacing={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item key={1} xs={10} sm={10} md={10}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/random"
              title="Image title"
            />

            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                Invalid Voucher!
              </Typography>
              <Typography align="center">{props.displayText}</Typography>
            </CardContent>

            <div className={classes.heroButtons}>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: BLUE, color: "white" }}
                    component={Link}
                    to="/cashier/transaction"
                  >
                    Return to checkout
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/cashier/qr"
                  >
                    Scan again
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
