import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
import { Stack } from '@mui/material';

export  function TitlebarImageList({
    itemData
}:{
    itemData: {
        img?: string,
        title: string,
        author?: string,
        rows?: number,
        cols?: number,
        featured?: boolean
    }[]
}) {
    return (
        <ImageList sx={{ width: "auto", height: "auto" }} cols={4} gap={18} >
          {itemData.map((item) => (
            <ImageListItem key={item.img} >
                
              <Image
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
                className='rounded-lg'
                width={500}
                height={500}
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
                position="below"
                className='text-secondary'
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
}

