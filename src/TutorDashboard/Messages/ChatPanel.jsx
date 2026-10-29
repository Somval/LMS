
import React, { useRef, useState, useEffect } from "react";
import {
  Paperclip,
  Image as ImageIcon,
  Send,
  X,
  FileText,
  Download,
} from "lucide-react";
import { Avatar } from "../../components/Tutor/ConversationSidebar";

export default function ChatPanel({
  conversation,
  messages = [],
  onSendMessage,
}) {
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        if (attachment.preview) {
          URL.revokeObjectURL(attachment.preview);
        }
      });
    };
  }, [attachments]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    setDraft("");
    setAttachments([]);
  }, [conversation?.id]);

  if (!conversation) {
    return (
      <section className="flex h-full min-h-0 items-center justify-center rounded-[4px] border border-[#EDF0F5] bg-white">
        <p className="text-[12px] text-[#98A2B3]">
          Select a conversation to start messaging.
        </p>
      </section>
    );
  }

  function addFiles(fileList) {
    const selectedFiles = Array.from(fileList || []);

    if (!selectedFiles.length) return;

    const newAttachments = selectedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setAttachments((previous) => [
      ...previous,
      ...newAttachments,
    ]);
  }

  function removeAttachment(id) {
    setAttachments((previous) => {
      const attachment = previous.find((item) => item.id === id);

      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview);
      }

      return previous.filter((item) => item.id !== id);
    });
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const text = draft.trim();

    if ((!text && attachments.length === 0) || sending) {
      return;
    }

    if (typeof onSendMessage !== "function") {
      console.error("ChatPanel requires an onSendMessage function.");
      return;
    }

    const outgoingAttachments = attachments.map(
      ({ id, file, name, size, type, preview }) => ({
        id,
        file,
        name,
        size,
        type,
        preview,
      })
    );

    try {
      setSending(true);

      // The third argument contains the selected File objects.
      // Update MessagesPage to accept and store this argument.
      await onSendMessage(
        conversation.id,
        text,
        outgoingAttachments
      );

      setDraft("");
      setAttachments([]);
    } catch (error) {
      console.error("Unable to send message:", error);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[4px] border border-[#EDF0F5] bg-white">
      {/* Chat header */}
      <header className="flex min-h-[54px] shrink-0 items-center gap-[9px] border-b border-[#F0F2F6] px-[11px] py-2">
        <Avatar
          conversation={conversation}
          size="h-[29px] w-[29px]"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[10px] font-semibold leading-[14px] text-[#171D29]">
            {conversation.name}
          </h2>

          <p className="truncate text-[8px] leading-[11px] text-[#778394]">
            {conversation.student}
            {conversation.course
              ? ` · ${conversation.course}`
              : ""}
          </p>

          <div className="mt-[2px] flex items-center gap-[4px]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#28C76F]" />
            <span className="text-[7px] text-[#718096]">
              Available
            </span>
          </div>
        </div>
      </header>

      {/* Message history */}
      <div
        className="flex min-h-0 flex-1 flex-col gap-[15px] overflow-y-auto px-[10px] py-[13px] sm:px-[12px]"
        aria-label="Message history"
        aria-live="polite"
      >
        <div className="pb-[2px] text-center text-[7px] text-[#A0A7B2]">
          {messages.length > 0
            ? "MESSAGES"
            : "START OF CONVERSATION"}
        </div>

        {messages.map((message) => {
          const isMine = message.sender === "me";

          return (
            <div
              key={message.id}
              className={`flex w-full items-end gap-[6px] ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              {!isMine && (
                <Avatar
                  conversation={conversation}
                  size="h-[21px] w-[21px]"
                />
              )}

              <div
                className={`flex max-w-[82%] flex-col ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <span className="mb-[4px] text-[7px] text-[#7F8998]">
                  {isMine ? "You" : conversation.name}
                  {" · "}
                  {message.time}
                </span>

                {message.text && (
                  <div
                    className={`whitespace-pre-wrap break-words rounded-[7px] px-[9px] py-[7px] text-[9px] leading-[14px] ${
                      isMine
                        ? "rounded-br-[2px] bg-[#A9C4FF] text-[#172744]"
                        : "rounded-bl-[2px] bg-[#F0F2F6] text-[#222936]"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Sent image and file attachments */}
                {message.attachments?.map((attachment, index) => {
                  const fileUrl =
                    attachment.url || attachment.preview;

                  const isImage =
                    attachment.type?.startsWith("image/") ||
                    attachment.file?.type?.startsWith("image/");

                  return (
                    <div
                      key={attachment.id || index}
                      className="mt-[6px] max-w-full overflow-hidden rounded-[7px] border border-[#E5E9F0] bg-white"
                    >
                      {isImage && fileUrl ? (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          <img
                            src={fileUrl}
                            alt={attachment.name || "Attached image"}
                            className="max-h-[220px] max-w-full object-contain"
                          />
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 p-2">
                          <FileText
                            size={16}
                            className="shrink-0 text-[#6480B8]"
                          />

                          <div className="min-w-0">
                            <p className="break-all text-[9px] font-medium text-[#344054]">
                              {attachment.name}
                            </p>

                            {attachment.size != null && (
                              <p className="text-[8px] text-[#98A2B3]">
                                {formatFileSize(attachment.size)}
                              </p>
                            )}
                          </div>

                          {fileUrl && (
                            <a
                              href={fileUrl}
                              download={attachment.name}
                              aria-label={`Download ${attachment.name}`}
                              className="ml-auto text-[#6480B8]"
                            >
                              <Download size={14} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {isMine && (
                <Avatar
                  name="Tutor"
                  imageUrl={conversation.tutorAvatarUrl}
                  size="h-[21px] w-[21px]"
                />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Message composer */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 px-[9px] pb-[8px] pt-[5px]"
      >
        <div className="rounded-[6px] border border-[#E5E9F0] bg-white p-[7px] focus-within:border-[#B6C9F8]">
          {/* Selected attachment previews */}
          {attachments.length > 0 && (
            <div className="mb-[8px] flex flex-wrap gap-[7px]">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="relative flex max-w-full items-center gap-2 rounded-[6px] border border-[#E5E9F0] bg-[#F8FAFD] p-[6px]"
                >
                  {attachment.preview ? (
                    <img
                      src={attachment.preview}
                      alt={attachment.name}
                      className="h-[42px] w-[42px] shrink-0 rounded-[4px] object-cover"
                    />
                  ) : (
                    <FileText
                      size={20}
                      className="shrink-0 text-[#6480B8]"
                    />
                  )}

                  <div className="min-w-0">
                    <p className="max-w-[150px] truncate text-[9px] font-medium text-[#344054]">
                      {attachment.name}
                    </p>

                    <p className="text-[8px] text-[#98A2B3]">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeAttachment(attachment.id)
                    }
                    aria-label={`Remove ${attachment.name}`}
                    className="ml-1 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[#7C8798] hover:bg-[#E5E9F0] hover:text-[#344054]"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Write a message..."
            aria-label="Write a message"
            rows={2}
            className="block max-h-[90px] min-h-[30px] w-full resize-y bg-transparent text-[9px] leading-[14px] text-[#344054] outline-none placeholder:text-[#A1A9B5]"
          />

          <div className="mt-[5px] flex items-center justify-between">
            <div className="flex items-center gap-[5px]">
              {/* Attach any file */}
              <button
                type="button"
                aria-label="Attach a file"
                title="Attach a file"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] bg-[#EFF3FA] text-[#8390A3] hover:bg-[#E4EBF8]"
              >
                <Paperclip size={13} />
              </button>

              {/* Attach images only */}
              <button
                type="button"
                aria-label="Attach an image"
                title="Attach an image"
                onClick={() => imageInputRef.current?.click()}
                className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] bg-[#EFF3FA] text-[#8390A3] hover:bg-[#E4EBF8]"
              >
                <ImageIcon size={13} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(event) => {
                  addFiles(event.target.files);
                  event.target.value = "";
                }}
              />

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={
                sending ||
                (!draft.trim() && attachments.length === 0)
              }
              className="inline-flex h-[24px] items-center gap-[4px] rounded-[4px] bg-[#326AFF] px-[9px] text-[9px] font-medium text-white transition hover:bg-[#2457E5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send"}
              <Send size={11} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
