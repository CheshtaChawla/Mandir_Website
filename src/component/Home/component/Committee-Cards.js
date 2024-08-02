import Card from 'react-bootstrap/Card';
// if this is making error to import this upper vale....IN TERMINAL -> npm install react-bootstrap

import '../component/responsiveness/Committee.css';

export default function CommitteeCard(props) {
  return (
    <div className='custom-committee-card inline-block w-1/3 2xl:px-5 xl:px-5 lg:px-3 md:px-3 sm:px-1 pt-10 pb-1'>    {/*INLINE-BLOCK property is used to allign both cards into same line inside the flex, flex-row*/}
      <div className='shadow-2xl shadow-top-2xl shadow-orange-200 rounded-2xl flex justify-center'>
        <Card className='card-committee-inner'>
          <Card.Img variant="top" src={props.children.image} />
          <Card.Body className='flex flex-col justify-center'>
            <Card.Title className='custom-card-title flex justify-center 2xl:text-xl xl:text-xl lg:text-small md:text-small sm:text-small font-bold'>{props.children.title}</Card.Title>
            <Card.Text className='custom-card-text flex justify-center 2xl:text-sm xl:text-sm lg:text-sm md:text-sm sm:text-sm text-orange-500'>{props.children.text}</Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

