const Avatar = (props) => {
  const { value } = props;

  return (
    <div className='col-lg-4 col-md-4 mb-one-s'>
      <div className='flex-center-start'>
        <div
          className='avatar avatar-rounded avatar-m'
          style={{ cursor: 'default' }}
        >
          <span>{value ? value[0].toUpperCase() : 'U'}</span>
        </div>
        <div className='user-info ml-one-s'>
          <p className="font-s grey1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
