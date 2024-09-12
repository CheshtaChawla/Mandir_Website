import Card from 'react-bootstrap/Card';
// if this is making error to import this upper vale....IN TERMINAL -> npm install react-bootstrap

import '../component/responsiveness/Committee.css';

export default function CommitteeCard({image, title, text}) {
  return (
  
    <div className='w-full px-2 pt-10 pb-1'> {/* Make sure to use full width and add padding for spacing */}
    <div className='shadow-2xl shadow-top-2xl shadow-orange-200 rounded-2xl flex justify-center'>
      <Card className='card-committee-inner w-full'> {/* Ensure Card takes full width */}
        <Card.Img variant="top" src={image} />
        <Card.Body className='flex flex-col justify-center'>
          <Card.Title className='custom-card-title flex justify-center text-xl font-bold'>{title}</Card.Title>
          <Card.Text className='custom-card-text flex justify-center text-sm text-orange-500'>{text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  </div>
  );
}

