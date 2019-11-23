import React from "react";
import { Segment, Header, Icon, Card } from "semantic-ui-react";
const Landing = () => {
  return (
    <div id="landing">
      <Segment secondary>
        <Header textAlign="center" as="h1" icon className="landing-text">
          <Icon name="home" className="landing-text" />
          Roome
          <Header.Subheader className="landing-text">
            At Roome we offer a carefully crafted selection of home goods,
            furniture, and lighting.
          </Header.Subheader>
        </Header>
      </Segment>
      <Header size="medium">Browse our best...</Header>
      <Card.Group itemsPerRow="3" stackable centered>
        <Card
          header="Tables"
          image="http://res.cloudinary.com/gnatscloud/image/upload/v1572912879/zizxmp0yrhckpxwto67z.jpg"
          fluid={true}
          href="http://localhost:3000/products/?page=1&type=Tables"
        />
        <Card
          header="Home Decor"
          image="http://res.cloudinary.com/gnatscloud/image/upload/v1572891822/mpgprmvu8nvg96ppdoty.jpg"
          fluid={true}
          href="http://localhost:3000/products/?page=1&type=HomeDecor"
        />
        <Card
          header="Sofas"
          image="https://res-4.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/o/n/on1_sleepr_rd_one-night-stand-craig-red.2x.jpg"
          fluid={true}
          href="http://localhost:3000/products/?page=1&type=Sofas"
        />
        <Card
          header="Chairs"
          image="http://res.cloudinary.com/gnatscloud/image/upload/v1574468969/bs7hy56n4fvbrsfc7rr7.webp"
          fluid={true}
          href="http://localhost:3000/products/?page=1&type=Chairs"
        />
        <Card
          header="Dressers & Storage Drawers"
          image="https://res-5.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/m/o/modu-licious_4_-_modern_dresser_storage_4.jpg"
          fluid={true}
          href="http://localhost:3000/products/?page=1&type=Dressers"
        />
      </Card.Group>
    </div>
  );
};

export default Landing;
