import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { Text } from "@chakra-ui/core"
import './Card.css'

export default function ProductionCompanies({ companies, baseUrl }) {
   const listCompanies = companies.map((companie,index) =>
    <Tooltip key={index} title={<Text fontSize="sm" >{companie.name}</Text>}>
        <Avatar alt={companie.name} src={companie.logo_path !== null ? baseUrl+companie.logo_path : process.env.PUBLIC_URL + '/images/logo_companie_square_placeholder_80x80.png'} />
    </Tooltip>
    );

  return (
      <>
    <AvatarGroup max={3} className="avatar-group" >
         {listCompanies}
    </AvatarGroup>
    </>
  );
}