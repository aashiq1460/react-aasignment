import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const item = state?.item;

  if (!item) {
    return (
      <>
        <h2>No media selected</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </>
    );
  }

  return (
    <>
      <h2>{item.title}</h2>

      <p>{item.description}</p>

      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
          Your browser does not support the video tag.
        </video>
      )}

      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Single;