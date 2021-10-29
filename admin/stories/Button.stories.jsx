import React from 'react';

function Button(props) {
  return ( 
    <button>This Is A Button</button>
  );
}

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const FirstStory = Template.bind({});
