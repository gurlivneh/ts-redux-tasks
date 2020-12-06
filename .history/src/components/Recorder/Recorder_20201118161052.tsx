import React from 'react';

const Recorder = () => {
	return (
		<Main>
			<Button>
				<Span></Span>
            </Button>
            <Counter></Counter>
		</Main>
	);
};

export default Recorder;


const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 60px 0 40px;
`;

const Button = styled.button`
 text-align: center;
 background-color:green;
 height:1000px;
 width:100%;
`;

const Span = styled.span`
  background: #f25042;
  border-radius: 50%;
  display: inline-block;
  height: 24px;
  vertical-align: middle;
  width: 24px;
  transition: all 0.3s ease-out;
`;
const Counter = styled.div`
  margin: 0 0 0 15px;
  text-align: center;
  width: 80px;
  opacity: 0.5;
  transition: opacity 0.3s ease-out;
`;
 
 
