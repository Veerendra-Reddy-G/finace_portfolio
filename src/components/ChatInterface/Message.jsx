 // src/components/ChatInterface/Message.jsx
import React, { useState } from 'react';
import { Box, Typography, Avatar, Collapse, IconButton } from '@mui/material';
import { SmartToy, Person, ExpandMore, ExpandLess } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

const Message = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  const isUser = message.role === 'user';

  return (
    <Box className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <Avatar className={`w-8 h-8 ${isUser ? 'bg-primary-500' : 'bg-gray-500'}`}>
        {isUser ? <Person /> : <SmartToy />}
      </Avatar>
      
      <Box className={`max-w-2xl ${isUser ? 'bg-primary-500 text-white' : 'bg-gray-100'} rounded-2xl p-4 ${
        isUser ? 'rounded-tr-none' : 'rounded-tl-none'
      }`}>
        <div className="message-content">
          <ReactMarkdown
            components={{
              // Custom components for better styling
              h1: ({node, ...props}) => <Typography variant="h6" className="font-bold mb-2" {...props} />,
              h2: ({node, ...props}) => <Typography variant="subtitle1" className="font-semibold mb-2 mt-3" {...props} />,
              h3: ({node, ...props}) => <Typography variant="subtitle2" className="font-medium mb-1 mt-2" {...props} />,
              p: ({node, ...props}) => <Typography variant="body2" className="mb-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 mb-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 mb-2" {...props} />,
              li: ({node, ...props}) => <li className="text-sm" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
              em: ({node, ...props}) => <em className="italic" {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {message.reasoning && (
          <Box className="mt-3">
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              className={isUser ? 'text-primary-100' : 'text-gray-600'}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
              <Typography variant="caption" className="ml-1">
                {expanded ? 'Hide Reasoning' : 'Show Reasoning'}
              </Typography>
            </IconButton>
            
            <Collapse in={expanded}>
              <Box className={`mt-2 p-3 rounded-lg ${isUser ? 'bg-white bg-opacity-20' : 'bg-gray-200'}`}>
                <Typography variant="body2" className="font-semibold mb-1">
                  AI Reasoning:
                </Typography>
                <Typography variant="body2" className={isUser ? 'text-primary-50' : 'text-gray-700'}>
                  {message.reasoning}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        )}

        {message.sources && message.sources.length > 0 && (
          <Box className="mt-3">
            <Typography variant="caption" className={`font-semibold ${isUser ? 'text-primary-100' : 'text-gray-600'}`}>
              Sources:
            </Typography>
            <Box className="flex flex-wrap gap-1 mt-1">
              {message.sources.map((source, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  className={`px-2 py-1 rounded ${isUser ? 'bg-white bg-opacity-20 text-primary-50' : 'bg-gray-200 text-gray-700'}`}
                >
                  {source}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        <Typography variant="caption" className={`block mt-2 ${isUser ? 'text-primary-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;