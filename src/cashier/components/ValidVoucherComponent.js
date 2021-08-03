import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function ValidVoucher(props) {
    const classes = props.classes;
    const voucher = props.voucher;

    return (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <Grid item key={1} xs={10} sm={10} md={10}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <>
                        {(() => {
                          if (!voucher) {
                            return "null";
                          }

                          return voucher.name;
                        })()}
                      </>
                    </Typography>
                    <Typography>
                      {/* voucher type */}
                      Voucher Type:
                      <>
                        {(() => {
                          if (!voucher) {
                            return " null";
                          }

                          return " " + voucher.value;
                        })()}
                      </>
                    </Typography>
                    <Typography>
                      {/* voucher details */}
                      Voucher Details:
                      <>
                        {(() => {
                          if (!voucher) {
                            return " null";
                          }

                          return " " + voucher.details;
                        })()}
                      </>
                    </Typography>
                    <Typography>
                      {/* voucher expiry */}
                      Voucher Expiry:
                      <>
                        {(() => {
                          if (!voucher) {
                            return " null";
                          }
                          const date = new Date(voucher.expiry.toMillis());
                          return " " + date.toString();
                        })()}
                      </>
                    </Typography>
                    <Typography>
                      {/* voucher status */}
                      Voucher Status:
                      <>
                        {(() => {
                          if (!voucher) {
                            return " null";
                          }

                          return " " + voucher.status;
                        })()}
                      </>
                    </Typography>
                  </CardContent>

                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} style={{display: 'flex', justifyContent:'center', alignItems:'center', marginBottom: 20 }}>
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Redeem
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" color="primary">
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Card>
              </Grid>
          </Grid>
        </Container>
    )
}

        